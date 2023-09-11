import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useState, useEffect} from 'react';

import Constants from './../../Constants';
import AppStyles from './../../AppStyles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataLoading from './../components/DataLoading';
import UserProfile from './../components/UserProfile';

import axios from '../axios/axios';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const Profile = ({navigation}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var s_user = await AsyncStorage.getItem('user');
    s_user = JSON.parse(s_user);
    setUser(s_user);
    setLoading(false);
    // console.log(s_user);
  };

  const logoutFun = async () => {
    // await AsyncStorage.removeItem('verification');
    setLoading(true);
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    console.log(user._id);
    await axios.post(`/users/${user._id}/logout`);
    await messaging()
      .unsubscribeFromTopic(user._id)
      .then(() => console.log('Unsubscribed fom the topic!'));
    await AsyncStorage.removeItem('user');
    setLoading(false);

    // make api request for capturing time duration spend on apps
    navigation.replace('GetStarted');
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: 'https://thennect.page.link/download_app',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error occured',
        text2: '' + error,
        position: 'top',
      });
    }
  };

  if (loading) {
    return <DataLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[AppStyles.row, styles.info]}>
          <UserProfile user={user} />
          <View style={styles.userDetails}>
            <Text
              style={[AppStyles.headingH3, {color: Constants.colour.primary}]}>
              {user.firstName}
            </Text>
            <Text style={[AppStyles.body14, {color: Constants.colour.primary}]}>
              {user.emailID}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{width: 30}}
          onPress={() =>
            navigation.navigate('EditProfile', {
              data: user,
              callbackFun: fetchData,
            })
          }>
          <FontAwesome name="pencil" size={20} color={'#000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.options}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Profession')}>
          <FontAwesome name="plane" size={24} color={'#000'} />
          <Text style={[AppStyles.headingH5, {marginLeft: 10}]}>
            Profession
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}
          onPress={() =>
            navigation.navigate('CurrentWork', {callbackFun: fetchData})
          }>
          <View style={AppStyles.row}>
            <FontAwesome name="suitcase" size={24} color={'#000'} />
            <Text style={[AppStyles.headingH5, {marginLeft: 5}]}>
              Current work
            </Text>
          </View>
          {user.currentOperations != null ? (
            <MaterialCommunityIcons
              name="sticker-check-outline"
              color="green"
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="sticker-alert-outline"
              color="red"
              size={20}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}
          onPress={() =>
            navigation.navigate('Education', {callbackFun: fetchData})
          }>
          <View style={AppStyles.row}>
            <FontAwesome name="graduation-cap" size={24} color={'#000'} />
            <Text style={[AppStyles.headingH5, {marginLeft: 5}]}>
              Education details
            </Text>
          </View>
          {user.education.length > 0 ? (
            <MaterialCommunityIcons
              name="sticker-check-outline"
              color="green"
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="sticker-alert-outline"
              color="red"
              size={20}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}
          onPress={() =>
            navigation.navigate('GenralInfo', {
              callbackFun: fetchData,
              data: user,
            })
          }>
          <View style={AppStyles.row}>
            <FontAwesome name="th" size={24} color={'#000'} />
            <Text style={[AppStyles.headingH5, {marginLeft: 10}]}>
              Genral Information
            </Text>
          </View>
          {user.interests.length > 0 &&
          user.description != null &&
          user.oneLiner != null ? (
            <MaterialCommunityIcons
              name="sticker-check-outline"
              color="green"
              size={20}
            />
          ) : (
            <MaterialCommunityIcons
              name="sticker-alert-outline"
              color="red"
              size={20}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('Working')}>
          <FontAwesome name="info-circle" size={24} color={'#000'} />
          <Text style={[AppStyles.headingH5, {marginLeft: 10}]}>
            How to use The Nnect
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => shareApp()}>
          <FontAwesome name="share" size={24} color={'#000'} />
          <Text style={[AppStyles.headingH5, {marginLeft: 10}]}>
            Tell your friend
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ContactUs')}>
          <MaterialIcons name="contact-mail" size={24} color={'#000'} />

          <Text style={[AppStyles.headingH5, {marginLeft: 10}]}>
            Contact us
          </Text>
        </TouchableOpacity> */}
      </View>
      <View style={styles.divider} />
      <TouchableOpacity style={styles.option} onPress={logoutFun}>
        <MaterialIcons name="logout" size={24} color={'#000'} />

        <Text style={[AppStyles.headingH5, {marginLeft: 10}]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#000',
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10,
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  divider: {
    width: '100%',
    height: 2,
    marginVertical: 15,
    backgroundColor: '#ddd',
  },
  option: {
    flexDirection: 'row',
    padding: 20,
    paddingVertical: 10,
  },
});
