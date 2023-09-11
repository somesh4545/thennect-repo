import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppStyles from '../../AppStyles';

import BackButton from './../components/BackButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from './../components/PrimaryButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import fs from 'react-native-fs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import storage from '@react-native-firebase/storage';

import axios from '../axios/axios';
import Input from './../components/Input';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const formValidation = yup.object().shape({
  firstName: yup.string().required('Required').nullable(),
  lastName: yup.string(),
  emailID: yup.string().required('Required').nullable(),
  phoneNo: yup
    .string()
    .min(10, 'Minimum 10 characters required')
    .max(10, 'Maximum 10 characters allowed')
    .required('Required')
    .nullable(),
  // linkdin: yup.string(),
  // twitter: yup.string(),
  // instagram: yup.string(),
});

const EditProfile = ({navigation, route}) => {
  const [imgChange, setImgChange] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [interests, setInterests] = useState([]);
  const [user, setUser] = useState(route.params.data);

  useEffect(() => {
    // console.log()
    setInterests(route.params.data.interests);
    setImgUrl(route.params.data.img_url);
    createNavigation();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={AppStyles.header}>
            <BackButton
              onPress={() => {
                route.params.callbackFun();
                navigation.goBack();
              }}
            />
            <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
              Edit profile
            </Text>
          </View>
        );
      },
    });
  };

  const updateInDB = async values => {
    setDataProcessing(true);
    var data = {
      firstName: values.firstName,
      lastName: values.lastName,
      emailID: values.emailID,
      phoneNo: values.phoneNo,
    };
    if (imgChange == true) {
      await storeImgInStorage(data);
    } else {
      store(data);
    }
    // setDataProcessing(false);
  };

  const store = async data => {
    console.log(data);
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    axios
      .patch(`/users/${user._id}`, data)
      .then(async response => {
        const data = response.data.data;
        await AsyncStorage.setItem('user', data);
        route.params.callbackFun();
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);

        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + error,
        });
      });
    setDataProcessing(false);
  };

  const storeImgInStorage = async data => {
    try {
      let fileName = user._id + '_profile_pic';
      // console.log(profileImg, fileName);
      var destPath = '';
      if (imgUrl.startsWith('content://')) {
        const urlComponents = imgUrl.split('/');
        const fileNameAndExtension = urlComponents[urlComponents.length - 1];
        destPath = `${fs.TemporaryDirectoryPath}/${fileNameAndExtension}`;
        await fs.copyFile(imgUrl, destPath);
        imgUrl(destPath);
        // console.log(destPath);
        destPath = 'file://' + destPath;
      } else {
        destPath = imgUrl;
      }
      // console.log(destPath);

      const task = storage()
        .ref(fileName)
        .putFile('file://' + destPath);
      task.on('state_changed', taskSnapshot => {
        // console.log(
        //   Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        //     100
        // );
      });
      task.then(async () => {
        const firebaseUrl = await storage().ref(fileName).getDownloadURL();
        // console.log("firebase url: " + firebaseUrl);
        // console.log(firebaseUrl);
        data.img_url = firebaseUrl;
        store(data);
        // addMember(firebaseUrl);
      });
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error occured',
        text2: '' + error,
      });
      return null;
    }
  };

  const takeImgFromFile = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
    });
    if (result.didCancel != null) {
      Toast.show({
        type: 'error',
        text1: 'File not selected',
      });
    } else if (result.errorMessage != null) {
      Toast.show({
        type: 'error',
        text1: 'Error occured',
        text2: '' + result.errorMessage,
      });
    } else {
      if (result.assets[0].fileSize <= 2000000) {
        setImgUrl(result.assets[0].uri);
        // console.log(result.assets[0].uri);
        setImgChange(true);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Image size should be less than 2 MB',
        });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <View style={AppStyles.center}>
          {imgUrl == null ? (
            <View
              style={[
                styles.userImg,
                AppStyles.center,
                {backgroundColor: user.bgColor},
              ]}>
              <Text style={[AppStyles.headingH2, {color: '#fff'}]}>
                {user.firstName.slice(0, 1)}
              </Text>
            </View>
          ) : (
            <Image source={{uri: imgUrl}} style={[styles.userImg]} />
          )}
          <TouchableOpacity onPress={takeImgFromFile}>
            <AntDesign
              style={{paddingHorizontal: 15}}
              name="camera"
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        </View>
        <Formik
          initialValues={{
            firstName: route.params.data.firstName,
            lastName: route.params.data.lastName,
            emailID: route.params.data.emailID,
            phoneNo: route.params.data.phoneNo,
          }}
          validateOnBlur={false}
          validationSchema={formValidation}
          onSubmit={values => updateInDB(values)}>
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
                placeholder="Enter your firstname"
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                value={values.firstName}
              />
              {errors.firstName && (
                <Text style={[AppStyles.error]}>{errors.firstName}</Text>
              )}
              <Input
                iconName="user"
                type="normal"
                placeholder="Enter your lastname"
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                value={values.lastName}
              />
              {errors.lastName && (
                <Text style={[AppStyles.error]}>{errors.lastName}</Text>
              )}
              <Input
                iconName="email"
                type="normal"
                placeholder="Enter your email address"
                editable={false}
                onChangeText={handleChange('emailID')}
                onBlur={handleBlur('emailID')}
                value={values.emailID}
              />
              {errors.emailID && (
                <Text style={[AppStyles.error]}>{errors.emailID}</Text>
              )}
              <Input
                iconName="mobile"
                type="normal"
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                onChangeText={handleChange('phoneNo')}
                onBlur={handleBlur('phoneNo')}
                value={values.phoneNo}
              />
              {errors.phoneNo && (
                <Text style={[AppStyles.error]}>{errors.phoneNo}</Text>
              )}

              {/* <>
                <Input
                  iconName="linkdin"
                  type="normal"
                  placeholder="Your linkdin profile"
                  onChangeText={handleChange('linkdin')}
                  onBlur={handleBlur('linkdin')}
                  value={values.linkdin}
                />
                {errors.linkdin && (
                  <Text style={[AppStyles.error]}>{errors.linkdin}</Text>
                )}

                <Input
                  iconName="twitter"
                  type="normal"
                  placeholder="Your twitter profile"
                  onChangeText={handleChange('twitter')}
                  onBlur={handleBlur('twitter')}
                  value={values.twitter}
                />
                {errors.twitter && (
                  <Text style={[AppStyles.error]}>{errors.twitter}</Text>
                )}

                <Input
                  iconName="instagram"
                  type="normal"
                  placeholder="Your instagram profile"
                  onChangeText={handleChange('instagram')}
                  onBlur={handleBlur('instagram')}
                  value={values.instagram}
                />
                {errors.instagram && (
                  <Text style={[AppStyles.error]}>{errors.instagram}</Text>
                )}
              </> */}

              <PrimaryButton
                buttonStyle={{
                  height: 45,
                  marginVertical: 25,
                  elevation: 5,
                }}
                height={40}
                disabled={dataProcessing}
                title={
                  dataProcessing ? (
                    <ActivityIndicator color={'#fff'} size={20} />
                  ) : (
                    'Update'
                  )
                }
                onPress={() => handleSubmit()}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  descriptionBox: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#000',
  },
});
