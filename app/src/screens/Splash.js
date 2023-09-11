import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Animated,
  Dimensions,
} from 'react-native';
import React, {useRef, useEffect, useState} from 'react';

import Constants from '../../Constants';
import AppStyles from '../../AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios/axios';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';

const {height, width} = Dimensions.get('window');

const Splash = ({navigation}) => {
  const translation = useRef(new Animated.Value(200)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(translation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    axios
      .get('/')
      .then(response => console.log(response.data))
      .catch(error => console.log(error));

    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    dynamicLinks()
      .getInitialLink()
      .then(link => {
        handleDynamicLink(link);
      });
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, []);

  const handleDynamicLink = link => {
    console.log(link);
    // Handle dynamic link inside your own application
    if (link && link.url === 'https://thennect.com') {
      console.log(link.url);
      // ...navigate to your offers screen
    } else if (
      link &&
      link.url === 'https://thennect.page.link/email_verified'
    ) {
      navigation.replace('Login');
    } else {
      checkAuthStatus();
    }
  };

  const checkAuthStatus = async () => {
    // console.log(redirect);
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    if (user === null) {
      setTimeout(() => {
        navigation.replace('Onboarding');
      }, 1500);
    } else {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      // if (user.token != token) {
      axios.post(`/users/${user.emailID}/login`, {
        token: token,
        password: user.password,
      });
      // console.log('Token updated');
      // }
      setTimeout(() => {
        navigation.replace('Main');
      }, 1500);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          zIndex: 100,
          transform: [{translateY: translation}],
        }}>
        <ImageBackground
          style={[styles.mainContainer]}
          source={require('../assets/images/bgSplash.png')}
          imageStyle={{width: '100%', height: '100%'}}
          resizeMode="stretch">
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={[AppStyles.appTitle, {color: Constants.colour.primary}]}>
            The Nnect
          </Text>
        </ImageBackground>
      </Animated.View>
      <View style={styles.taglineContainer}>
        <Text style={[AppStyles.body16Bold, {color: Constants.colour.primary}]}>
          Connect and Grow
        </Text>
      </View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: height,
    backgroundColor: '#000',
  },
  mainContainer: {
    width: '100%',
    height: height - 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  taglineContainer: {
    width: '100%',
    height: 50,
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
