import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppStyles from '../../AppStyles';
import BackButton from './../components/BackButton';
import DataLoading from './../components/DataLoading';
import Toast from 'react-native-toast-message';
import axios from '../axios/axios';
import UserProfile from '../components/UserProfile';
import {convertDateToFormat} from '../utils/util';
import {TextInput} from 'react-native-paper';
import Constants from './../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height, width} = Dimensions.get('window');

const QnADetail = ({navigation, route}) => {
  const [_id, set_id] = useState(route.params._id);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    createNavigation();
    fetchData();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={AppStyles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <View>
              <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
                QnA Detail
              </Text>
            </View>
          </View>
        );
      },
    });
  };

  const fetchData = async () => {
    axios
      .get(`/qna/${_id}`)
      .then(response => {
        // console.log(response.data);
        setData(response.data.data);
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
        setLoading(false);
      });
  };

  const addReply = async () => {
    if (text && text.trim().length > 0) {
      setProcessing(true);
      const reply = text.trim();
      var user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const body = {
        user: user._id,
        comment: reply,
      };
      axios
        .post(`/qna/${_id}`, body)
        .then(res => {
          setText();
          fetchData();
          setProcessing(false);
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
          setProcessing(false);
        });
      console.log(body);
    } else {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
        onPress: () => {
          Toast.hide();
        },
        position: 'bottom',
      });
    }
  };

  if (loading) {
    return <DataLoading />;
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={[AppStyles.headingH2]}>Q. {data.question}</Text>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('UserDetail', {userId: data.user._id})
        }>
        <Text style={[AppStyles.body16Bold, {paddingVertical: 5}]}>
          Asked by {data.user.firstName}
        </Text>
      </TouchableOpacity>
      <Text style={[AppStyles.body14, {marginBottom: 5}]}>
        #{data.categories.join(', #')}
      </Text>
      <Text style={[AppStyles.body14]}>
        at {convertDateToFormat(data.createdAt)}
      </Text>

      <View style={{marginVertical: 20}}>
        <Text style={[AppStyles.body16Bold, {paddingVertical: 5}]}>Reply</Text>
        <TextInput
          multiline={true}
          maxLength={150}
          placeholder="Write your answer ..."
          value={text}
          onChangeText={text => setText(text)}
          style={[
            AppStyles.body16,
            {
              backgroundColor: '#fff',
              paddingHorizontal: -10,
            },
          ]}
        />
        <TouchableOpacity
          onPress={addReply}
          style={[AppStyles.center, {marginTop: 15}]}>
          <Text style={[AppStyles.body16Bold, styles.btn]}>
            {processing ? (
              <ActivityIndicator color={'#fff'} size={20} />
            ) : (
              'Submit'
            )}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginVertical: 10}}>
        <Text style={[AppStyles.headingH3]}>Replies</Text>
        <ScrollView>
          {data.comments.map(comment => (
            <View style={styles.comment} key={comment._id}>
              <UserProfile user={comment.user} imgDim={40} />
              <View style={{marginLeft: 10, width: width - 90}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UserDetail', {
                      userId: comment.user._id,
                    })
                  }>
                  <Text style={[AppStyles.body16Bold]}>
                    {comment.user.firstName}
                  </Text>
                </TouchableOpacity>
                <Text style={[AppStyles.body16, {paddingVertical: 5}]}>
                  {comment.comment}
                </Text>
                <Text style={[AppStyles.body12]}>
                  at {convertDateToFormat(comment.createdAt)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default QnADetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  comment: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  btn: {
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Constants.colour.primary,
    color: '#fff',
    borderRadius: 10,
    width: '100%',
  },
});
