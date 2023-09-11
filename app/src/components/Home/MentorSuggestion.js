import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../axios/axios';
import UserProfile from '../UserProfile';
import DataLoading from './../DataLoading';
import AppStyles from '../../../AppStyles';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import ShowMoreBtn from './../ShowMoreBtn';
import Constants from './../../../Constants';
import GradientText from './../GradientText';
import Entypo from 'react-native-vector-icons/Entypo';

const {height, width} = Dimensions.get('window');

const MentorSuggestionHomeScreen = props => {
  const {user} = props;
  const [loading, setLoading] = useState(true);
  const [mentorsListDb, setMentorsListDb] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    findMentors();
  }, []);

  const findMentors = async () => {
    const fields = '_id,img_url,bgColor,oneLiner,createdAt,firstName';
    axios
      .get(
        `/users/${user._id}/suggestMentors?fields=${fields}&limit=5&sort=-createdAt`,
      )
      .then(res => {
        const {data, count, page, limit, skip} = res.data;

        setMentorsListDb(JSON.parse(data));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        Toast.show({
          type: 'error',
          text1: 'Error occured while fetching blogs',
          text2: '' + error,
          onPress: () => {
            Toast.hide();
          },
          position: 'bottom',
        });
      });
  };

  const createChatWindow = async data => {
    setLoading(true);
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user._id == data._id) {
      Toast.show({
        type: 'error',
        text1: 'You cannot chat with yourself',
      });
      setLoading(false);
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
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + err,
        });
        setLoading(false);
      });
  };

  return (
    <View>
      <View>
        <Text style={[AppStyles.headingH3, {marginBottom: 10}]}>
          Mentors for you
        </Text>
      </View>
      {loading ? (
        <DataLoading />
      ) : (
        <>
          <ScrollView>
            {mentorsListDb.map(user => {
              return (
                <TouchableOpacity
                  key={user._id}
                  onPress={() => createChatWindow(user)}
                  style={[styles.card]}>
                  <UserProfile user={user} imgDim={50} />
                  <View style={{marginLeft: 5}}>
                    <Text style={[AppStyles.body16Bold]} numberOfLines={1}>
                      {user.firstName}
                    </Text>
                    <Text
                      style={[
                        AppStyles.body14,
                        {paddingVertical: 3, width: width - 80},
                      ]}
                      numberOfLines={1}>
                      {user.oneLiner}
                    </Text>
                    <Text
                      style={[
                        AppStyles.body14,
                        {color: Constants.colour.primary},
                      ]}>
                      Approach Now <Entypo name="chevron-right" size={16} />
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <ShowMoreBtn
            text="View more"
            onPress={() => navigation.navigate('MentorsSuggestion')}
          />
        </>
      )}
    </View>
  );
};

export default MentorSuggestionHomeScreen;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: width - 20,
    marginHorizontal: 5,
  },
});
