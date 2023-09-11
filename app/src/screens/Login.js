import {
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppStyles from '../../AppStyles';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Link from './../components/Link';
import PrimaryButton from './../components/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios/axios';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';

const loginValidationSchema = yup.object().shape({
  emailId: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required')
    .nullable(),
  password: yup.string().required('Password is required').nullable(),
});

const Login = ({navigation}) => {
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loginProcessing, setLoginProcessing] = useState(false);
  const [loginProcessingGoogle, setLoginProcessingGoogle] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const backAction = () => {
    navigation.replace('GetStarted');
    return true;
  };

  const loginFunction = async values => {
    setLoginProcessing(true);
    console.log(values);
    try {
      const user = await auth().signInWithEmailAndPassword(
        values.emailId,
        values.password,
      );
      if (user.user.emailVerified == false) {
        Toast.show({
          type: 'error',
          text1: 'Please verify your email',
        });
        await auth().signOut();

        setLoginProcessing(false);
      } else {
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        axios
          .post(`/users/${values.emailId}/login`, {
            token: token,
            password: values.password,
          })
          .then(async response => {
            const data = response.data.data;
            // console.log(data);

            await AsyncStorage.setItem('user', data);
            const user = JSON.parse(data);
            if (user.vStatus == false) {
              updateVerification(values);
            }
            messaging()
              .subscribeToTopic(user._id)
              .then(() => console.log('Subscribed to topic!'));
            setLoginProcessing(false);
            navigation.replace('Main');
          })
          .catch(error => {
            console.log(error);
            Toast.show({
              type: 'error',
              text1: 'Error occured',
              text2: '' + error,
            });
            setLoginProcessing(false);
          });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error occured',
        text2: '' + error,
      });
      console.error(error);
      setLoginProcessing(false);
    }
  };

  const updateVerification = async values => {
    axios.post(`/users/${values.emailId}/verify_email`);
  };

  const loginFunctionWithGoogle = () => {
    setLoginProcessingGoogle(true);
    setTimeout(() => {
      setLoginProcessingGoogle(false);
      navigation.replace('Main');
    }, 2000);
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={[AppStyles.container, styles.container]}>
        <BackButton onPress={() => navigation.replace('GetStarted')} />
        <Image
          source={require('../assets/images/login.png')}
          style={styles.img}
        />
        <View style={styles.form}>
          <Text style={[AppStyles.headingH1, {marginBottom: 20}]}>Login</Text>
          <Formik
            initialValues={{
              emailId: '',
              password: '',
            }}
            validationSchema={loginValidationSchema}
            onSubmit={values => loginFunction(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <Input
                  iconName="email"
                  type="normal"
                  placeholder="Email id"
                  onChangeText={handleChange('emailId')}
                  onBlur={handleBlur('emailId')}
                  value={values.emailId}
                  keyboardType="email-address"
                />
                {errors.emailId && (
                  <Text style={[AppStyles.error]}>{errors.emailId}</Text>
                )}
                <Input
                  iconName="password"
                  type="password"
                  secureTextEntry={secureTextEntry}
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  placeholder="Password"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && (
                  <Text style={[AppStyles.error]}>{errors.password}</Text>
                )}
                <Link
                  orientation="right"
                  text={'Forgot Password?'}
                  onPress={() => navigation.navigate('ForgotPassword')}
                />
                <PrimaryButton
                  buttonStyle={{height: 40, marginVertical: 15, elevation: 5}}
                  height={40}
                  disabled={loginProcessing}
                  title={
                    loginProcessing ? (
                      <ActivityIndicator color={'#fff'} size={20} />
                    ) : (
                      'Login'
                    )
                  }
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
          <View style={styles.row}>
            <View style={styles.line} />
            <Text style={[AppStyles.body16, {color: '#ddd'}]}>OR</Text>
            <View style={styles.line} />
          </View>
          {/* <TouchableOpacity
            disabled={loginProcessingGoogle}
            onPress={() => {
              loginFunctionWithGoogle();
            }}>
            <View style={styles.googleBtn}>
              {loginProcessingGoogle ? (
                <ActivityIndicator color={'#000'} size={20} />
              ) : (
                <>
                  <Image
                    style={styles.googleLogo}
                    source={require('../assets/images/google.png')}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 10,
                      fontFamily: 'DMSans-Regular',
                    }}>
                    Continue with Google
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity> */}
          <View style={styles.row2}>
            <Text style={AppStyles.body14}>Don't have an account? </Text>
            <Link
              orientation="left"
              text={'Signup'}
              onPress={() => navigation.replace('Signup')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: height / 3,
    resizeMode: 'contain',
    // backgroundColor: '#000',
  },
  form: {
    marginTop: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  row2: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  line: {
    width: '40%',
    height: 1,
    backgroundColor: '#ddd',
  },
  googleBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 10,
    backgroundColor: '#D8DAFF',
    margin: 10,
    borderRadius: 10,
  },
  googleLogo: {},
});
