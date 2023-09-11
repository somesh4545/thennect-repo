import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';

import AppStyles from '../../AppStyles';
import UserDetailHeader from '../components/UserDetailHeader';
import EducationCard from './../components/EducationCard';
import educationListData from '../data/educationListData';
import PrimaryButton from './../components/PrimaryButton';
import axios from '../axios/axios';
import DataLoading from './../components/DataLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const UserDetail = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [chatCreation, setChatCreation] = useState(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const userId = route.params.userId;
    axios
      .get(`/users/${userId}`)
      .then(res => {
        // console.log(res.data.data);
        const user = res.data.data;
        setData(user);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + error,
        });
      });
  };

  const createChatWindow = async () => {
    setChatCreation(true);
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user._id == data._id) {
      Toast.show({
        type: 'error',
        text1: 'You cannot chat with yourself',
      });
      setChatCreation(false);
      return;
    }
    axios
      .post(`/chats`, {
        senderID: user._id,
        receiverID: data._id,
      })
      .then(response => {
        const data = JSON.parse(response.data.data);
        const otherPerson = data.users.find(x => x._id != user._id);

        navigation.navigate('ChatDetail', {
          data: otherPerson,
          chatRoomID: data._id,
          chatRoomUsers: data.users,
        });
        setChatCreation(false);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + err,
        });
        setChatCreation(false);
      });
  };

  if (loading) {
    return <DataLoading />;
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <UserDetailHeader
        data={{
          firstName: data.firstName,
          bgColor: data.bgColor,
          img_url: data.img_url,
        }}
        scrollY={scrollY}
      />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{flexGrow: 1}}>
        <View>
          <View style={styles.basicInfo}>
            {/* current position */}
            {data.currentOperations.profession != 'Other' ? (
              <Text style={[AppStyles.headingH5, {marginBottom: 10}]}>
                {data.currentOperations.profession == 'Education'
                  ? 'Currently studying at'
                  : 'Working at'}{' '}
                {data.currentOperations.institution},{' '}
                {data.currentOperations.domain} {data.currentOperations.post}
              </Text>
            ) : null}

            {/* one liner */}
            <Text style={[AppStyles.headingH5, {marginVertical: 5}]}>
              {data.oneLiner}
            </Text>
            {/* about */}
            <Text style={[AppStyles.body14, {marginVertical: 5}]}>
              {data.description}
            </Text>
            {/* intresets */}
            <Text style={[AppStyles.body14, {marginVertical: 5}]}>
              Intreseted in #{data.interests.join(', #')}
            </Text>
          </View>
          {/* education */}
          <View style={styles.block}>
            <Text style={AppStyles.headingH3}>Education</Text>
            {data.education.map((item, index) => {
              return (
                <EducationCard
                  key={index}
                  item={item}
                  index={index}
                  disabled={true}
                />
              );
            })}
          </View>

          {/* social links */}
          <View style={styles.blank}></View>
        </View>
      </Animated.ScrollView>
      {/* chat button */}
      {route.params.chatNow == false ? null : (
        <View style={styles.chatBtnContainer}>
          <PrimaryButton
            buttonStyle={{height: 40, width: width - 100, elevation: 5}}
            height={40}
            disabled={chatCreation}
            title={
              chatCreation ? (
                <ActivityIndicator color={'#fff'} size={20} />
              ) : (
                'Approach Now'
              )
            }
            onPress={() => createChatWindow()}
          />
        </View>
      )}
    </View>
  );
};

export default UserDetail;

const styles = StyleSheet.create({
  container: {flex: 1},

  chatBtnContainer: {
    // position: 'absolute',
    // top: height,
    // height: 60,
    width: width,
    backgroundColor: '#fff',
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  basicInfo: {backgroundColor: '#fff', padding: 20},
  block: {backgroundColor: '#fff', padding: 20, marginVertical: 10},
  blank: {height: 150},
});
