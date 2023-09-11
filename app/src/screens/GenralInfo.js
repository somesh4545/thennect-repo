import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppStyles from '../../AppStyles';

import BackButton from './../components/BackButton';
import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from './../components/PrimaryButton';
import {MultiSelect} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from '../axios/axios';
import DataLoading from '../components/DataLoading';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const formValidation = yup.object().shape({
  oneLiner: yup
    .string()
    .min(15, 'Minimum 15 characters required')
    .max(50, 'Maximum 50 characters allowed')
    .required('Required')
    .nullable(),
  description: yup
    .string()
    .min(50, 'Minimum 50 characters required')
    .max(250, 'Maximum 250 characters allowed')
    .required('Required')
    .nullable(),
});

const GenralInfo = ({navigation, route}) => {
  const [dataProcessing, setDataProcessing] = useState(false);
  const [interestsArray, setInterestsArray] = useState([]);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    // console.log()
    fetchInterestData();
    setInterests(route.params.data.interests);
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
              Genral Information
            </Text>
          </View>
        );
      },
    });
  };

  const fetchInterestData = () => {
    axios
      .get('/interests')
      .then(response => {
        // console.log(response);
        var data = JSON.parse(response.data.data);
        data = data.interests;
        data = data.map(x => ({
          label: x,
          value: x,
        }));
        setInterestsArray(data);
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

  const updateInDB = async values => {
    setDataProcessing(true);
    var data = values;
    data.interests = interests;
    if (interests.length == 0 || interestsArray.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Select atleast one interests',
      });
      setDataProcessing(false);
      return;
    }
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

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            oneLiner: route.params.data.oneLiner,
            description: route.params.data.description,
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
              <Text
                style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
                One line description
              </Text>

              <TextInput
                placeholder="Spoon feeding, in the long run, teaches us nothing but the shape of the spoon"
                placeholderTextColor={'#ddd'}
                onChangeText={handleChange('oneLiner')}
                value={values.oneLiner}
                onBlur={handleBlur('oneLiner')}
                multiline={true}
                style={styles.descriptionBox}
              />
              {errors.oneLiner && (
                <Text style={[AppStyles.error]}>{errors.oneLiner}</Text>
              )}

              <Text
                style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
                Describe about yourself
              </Text>
              <TextInput
                placeholder="I am a cloud engineer working ......."
                placeholderTextColor={'#ddd'}
                onChangeText={handleChange('description')}
                value={values.description}
                onBlur={handleBlur('description')}
                multiline={true}
                style={styles.descriptionBox}
              />
              {/* <Text>{values.description.replace(/\s+/g, '').length}</Text> */}
              {errors.description && (
                <Text style={[AppStyles.error]}>{errors.description}</Text>
              )}

              <Text
                style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
                Select interests <Text style={{fontSize: 10}}>(max 5)</Text>
              </Text>
              {interestsArray.length == 0 ? (
                <ActivityIndicator size="small" color="black" />
              ) : (
                <MultiSelect
                  maxSelect={5}
                  style={styles.dropdown}
                  activeColor={'#ddd'}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={interestsArray}
                  labelField="label"
                  valueField="value"
                  placeholder="find various interests"
                  searchPlaceholder="Search..."
                  value={interests}
                  onChange={item => {
                    setInterests(item);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                  selectedStyle={styles.selectedStyle}
                />
              )}

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

export default GenralInfo;

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
    minHeight: 150,
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    // marginTop: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  selectedTextStyle: {
    fontSize: 12,
    fontFamily: 'DMSans-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: 'DMSans-Regular',
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});
