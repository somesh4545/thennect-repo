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
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppStyles from '../../AppStyles';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import PrimaryButton from './../components/PrimaryButton';
import Toast from 'react-native-toast-message';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

const fromValidationSchema = yup.object().shape({
  emailId: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required')
    .nullable(),
});

const ForgotPassword = ({navigation}) => {
  const [name, setName] = useState('');
  const [resetProcessing, setresetProcessing] = useState(false);

  const resetPassword = async values => {
    setresetProcessing(true);
    try {
      await auth().sendPasswordResetEmail(values.emailId);
      Toast.show({
        type: 'info',
        text1: 'Check your inbox',
        text2: 'Password reset link has been sent to your email account',
      });
      setresetProcessing(false);
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error occured',
        text2: '' + error.message,
        // position: 'bottom',
      });
      console.log(error);
      setresetProcessing(false);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={[AppStyles.container, styles.container]}>
        <BackButton onPress={() => navigation.goBack()} />

        <Image
          source={require('../assets/images/forgot_password.png')}
          style={styles.img}
        />
        <View style={styles.form}>
          <Text style={[AppStyles.headingH1, {marginBottom: 5}]}>
            Forgot Password ?
          </Text>
          <Text style={[styles.body14, {marginBottom: 5}]}>
            Don’t worry! It happens. Please enter the address associated with
            your account
          </Text>
          <Formik
            initialValues={{
              emailId: '',
            }}
            validationSchema={fromValidationSchema}
            onSubmit={values => resetPassword(values)}>
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
                <PrimaryButton
                  buttonStyle={{marginVertical: 25, elevation: 5}}
                  height={40}
                  disabled={resetProcessing}
                  title={
                    resetProcessing ? (
                      <ActivityIndicator color={'#fff'} size={20} />
                    ) : (
                      'Continue'
                    )
                  }
                  onPress={() => {
                    handleSubmit();
                  }}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: height / 2,
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
