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
import professionTypes from '../data/professionTypes';
import educationBranches from '../data/educationBranches';
import carrerBranches from '../data/carrerBranches';
import PrimaryButton from './../components/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import CustomDropdown from './../components/CustomDropdown';
import axios from '../axios/axios';
import Toast from 'react-native-toast-message';

const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required('User name is required').nullable(),
  emailID: yup
    .string()
    .email('Please enter valid email')
    .required('Email Address is Required')
    .nullable(),
  phoneNo: yup
    .string()
    .min(10, ({min}) => `Phone number must be ${min} characters`)
    .max(10, ({max}) => `Phone number must be ${max} characters`)
    .required('Phone number is required')
    .nullable(),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required')
    .nullable(),
});

const Signup = ({navigation}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [signupProcessing, setsignupProcessing] = useState(false);
  const [signupProcessingGoogle, setsignupProcessingGoogle] = useState(false);

  // profession=bussiness, other, job, education
  // post/branch=computer engineering, manger
  // field/domain=btech,analyst
  // institute=name of institute
  const [profession, setProfession] = useState('');
  const [post, setPost] = useState('');
  const [domain, setDomain] = useState(null);
  const [institution, setInstitution] = useState('');
  const [other, setOther] = useState('');

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    navigation.replace('GetStarted');
    return true;
  };

  const signupFunction = async values => {
    setsignupProcessing(true);

    if (profession == null) {
      Toast.show({
        type: 'error',
        text1: 'Please select profession',
      });
      // return;
      setsignupProcessing(false);
    } else if (profession == 'Other' && other.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please specify profession',
      });
      setsignupProcessing(false);
    } else if (
      profession != 'Other' &&
      (post.length == 0 || domain == null || institution.length == 0)
    ) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      setsignupProcessing(false);
    } else {
      values.currentOperations = {
        profession,
        post: profession == 'Other' ? other : post,
        domain,
        institution,
      };
      try {
        const user = await auth().createUserWithEmailAndPassword(
          values.emailID,
          values.password,
        );
        console.log(user);

        await auth().currentUser.sendEmailVerification({
          handleCodeInApp: false,
          url: 'https://thennect.page.link/email_verified',
          // dynamicLinkDomain: 'https://thennect.page.link/email_verified',
          android: {
            installApp: true,
            packageName: 'com.thennect',
          },
        });

        axios
          .post('/users', values)
          .then(async response => {
            await auth().signOut();
            Toast.show({
              type: 'info',
              text1:
                'Please verify your email. A verification link has been send to you',
            });

            // ToastAndroid.show('Account created successfully', ToastAndroid.SHORT);

            setsignupProcessing(false);
            navigation.replace('Login');
          })
          .catch(error => {
            console.log(error);
            Toast.show({
              type: 'error',
              text1: 'Error occured',
              text2: '' + error,
            });
            setsignupProcessing(false);
          });
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + error,
        });
        console.error(error);
      }
      setsignupProcessing(false);
      // console.log(values);
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={[AppStyles.container, styles.container]}>
        <BackButton onPress={() => navigation.replace('GetStarted')} />
        <Image
          source={require('../assets/images/signup.png')}
          style={styles.img}
        />
        <View style={styles.form}>
          <Text style={[AppStyles.headingH1, {marginBottom: 20}]}>Sign up</Text>
          <Formik
            initialValues={{
              firstName: '',
              emailID: '',
              phoneNo: '',
              password: '',
            }}
            validationSchema={signupValidationSchema}
            onSubmit={values => signupFunction(values)}>
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
                  iconName="user"
                  type="normal"
                  placeholder="Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                {errors.firstName && (
                  <Text style={[AppStyles.error]}>{errors.firstName}</Text>
                )}
                <Input
                  iconName="email"
                  type="normal"
                  placeholder="Email id"
                  onChangeText={handleChange('emailID')}
                  onBlur={handleBlur('emailID')}
                  value={values.emailID}
                  keyboardType="default"
                />
                {errors.emailID && (
                  <Text style={[AppStyles.error]}>{errors.emailID}</Text>
                )}
                <Input
                  iconName="mobile"
                  type="normal"
                  placeholder="Phone number"
                  onChangeText={handleChange('phoneNo')}
                  onBlur={handleBlur('phoneNo')}
                  value={values.phoneNo}
                  keyboardType="number-pad"
                />
                {errors.phoneNo && (
                  <Text style={[AppStyles.error]}>{errors.phoneNo}</Text>
                )}
                <Input
                  iconName="password"
                  type="password"
                  secureTextEntry={secureTextEntry}
                  placeholder="Password"
                  onPress={() => setSecureTextEntry(!secureTextEntry)}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {errors.password && (
                  <Text style={[AppStyles.error]}>{errors.password}</Text>
                )}
                <CustomDropdown
                  icon={'Safety'}
                  placeholder="Profession"
                  data={professionTypes}
                  value={profession}
                  setValue={setProfession}
                  onChange={setDomain}
                  searchable={false}
                />
                {profession != 'Other' && profession != '' ? (
                  <View>
                    <Input
                      iconType="book"
                      type="normal"
                      placeholder={
                        profession == 'Education'
                          ? 'Enter branch Ex. Computer'
                          : 'Enter post Ex. Manager'
                      }
                      onChangeText={setPost}
                      value={post}
                    />
                    <CustomDropdown
                      icon={'Safety'}
                      data={
                        profession == 'Education'
                          ? educationBranches
                          : carrerBranches
                      }
                      value={domain}
                      setValue={setDomain}
                      searchable={true}
                      placeholder={
                        profession == 'Education'
                          ? 'Select degree'
                          : 'Select domain'
                      }
                    />
                    <Input
                      iconType="school"
                      type="normal"
                      placeholder="Enter institiute name"
                      onChangeText={setInstitution}
                      value={institution}
                    />
                  </View>
                ) : null}

                {profession == 'Other' ? (
                  <Input
                    iconType="outdent"
                    type="normal"
                    placeholder="Specify"
                    onChangeText={setOther}
                    value={other}
                  />
                ) : null}

                <PrimaryButton
                  buttonStyle={{height: 40, marginVertical: 15, elevation: 5}}
                  height={40}
                  disabled={signupProcessing}
                  title={
                    signupProcessing ? (
                      <ActivityIndicator color={'#fff'} size={20} />
                    ) : (
                      'Continue'
                    )
                  }
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>

          {/* <View style={styles.row}>
          <View style={styles.line} />
          <Text style={[AppStyles.body16, {color: '#ddd'}]}>OR</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity
          disabled={signupProcessingGoogle}
          onPress={() => {
            signupFunctionWithGoogle();
          }}>
          <View style={styles.googleBtn}>
            {signupProcessingGoogle ? (
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
        </TouchableOpacity>
      */}
          <View style={styles.row2}>
            <Text style={AppStyles.body14}>Already have an account? </Text>
            <Link
              orientation="left"
              text={'Login'}
              onPress={() => navigation.replace('Login')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

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
