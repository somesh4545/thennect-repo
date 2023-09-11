import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';

import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from './../components/PrimaryButton';
import Input from './../components/Input';
import SecondaryButton from './../components/SecondaryButton';
import axios from '../axios/axios';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const formValidation = yup.object().shape({
  school: yup.string().required('School / College name is Required').nullable(),
  degree: yup.string().required('Degree is required').nullable(),
  fieldOfStudy: yup.string().required('Field of study is required').nullable(),
  startYear: yup
    .string()
    .min(4, 'Improper year')
    .max(4, 'Improper year')
    .required('Starting year is required')
    .nullable(),
  endYear: yup
    .string()
    .min(4, 'Improper year')
    .max(4, 'Improper year')
    .required('Ending year is required')
    .nullable(),
  grade: yup.number(),
});

const EducationDetail = ({navigation, route}) => {
  const [dataProcessing, setDataProcessing] = useState(false);
  const [updateProcessing, setUpdateProcessing] = useState(false);
  const [deleteProcessing, setDeleteProcessing] = useState(false);

  const initialData = route.params.data;
  const callbackFun = route.params.callbackFun;

  useEffect(() => {
    createNavigation();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={styles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
              Education Detail
            </Text>
          </View>
        );
      },
    });
  };

  const updateEducationDetail = async data => {
    setDataProcessing(true);
    setUpdateProcessing(true);
    data._id = initialData._id;
    data.bgColor = initialData.bgColor;
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    axios
      .patch(`/users/${user._id}/education/${data._id}`, data)
      .then(async response => {
        const data = response.data.data;
        await AsyncStorage.setItem('user', data);
        callbackFun();
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
    setUpdateProcessing(false);
    setDataProcessing(false);
  };

  const deleteEducationDetail = async data => {
    setDataProcessing(true);
    setDeleteProcessing(true);
    data._id = initialData._id;
    data.bgColor = initialData.bgColor;
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    axios
      .delete(`/users/${user._id}/education/${data._id}`, data)
      .then(async response => {
        const data = response.data.data;
        await AsyncStorage.setItem('user', data);
        callbackFun();
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
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            school: initialData.school,
            degree: initialData.degree,
            fieldOfStudy: initialData.fieldOfStudy,
            startYear: initialData.startYear,
            endYear: initialData.endYear,
            grade: initialData.grade,
          }}
          validateOnBlur={false}
          validationSchema={formValidation}
          onSubmit={values => updateEducationDetail(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <>
              {/* <Text style={[AppStyles.body16, {marginBottom: -10}]}>
                Enter school / college name
              </Text> */}
              <Input
                iconType="school"
                type="normal"
                placeholder="Enter school / college name"
                onChangeText={handleChange('school')}
                onBlur={handleBlur('school')}
                value={values.school}
              />
              {errors.school && (
                <Text style={[AppStyles.error]}>{errors.school}</Text>
              )}

              <Input
                iconType="graduation-cap"
                type="normal"
                placeholder="Enter degree name"
                onChangeText={handleChange('degree')}
                onBlur={handleBlur('degree')}
                value={values.degree}
              />
              {errors.degree && (
                <Text style={[AppStyles.error]}>{errors.degree}</Text>
              )}

              <Input
                iconType="book"
                type="normal"
                placeholder="Enter studying filed"
                onChangeText={handleChange('fieldOfStudy')}
                onBlur={handleBlur('fieldOfStudy')}
                value={values.fieldOfStudy}
              />
              {errors.fieldOfStudy && (
                <Text style={[AppStyles.error]}>{errors.fieldOfStudy}</Text>
              )}

              <View style={styles.row}>
                <View>
                  <Input
                    iconType="clock"
                    type="normal"
                    placeholder="Enter start year"
                    onChangeText={handleChange('startYear')}
                    onBlur={handleBlur('startYear')}
                    value={values.startYear}
                    keyboardType="number-pad"
                  />
                  {errors.startYear && (
                    <Text style={[AppStyles.error]}>{errors.startYear}</Text>
                  )}
                </View>
                <View>
                  <Input
                    iconType="clock"
                    type="normal"
                    placeholder="Enter end year"
                    onChangeText={handleChange('endYear')}
                    onBlur={handleBlur('endYear')}
                    keyboardType="number-pad"
                    value={values.endYear}
                  />
                  {errors.endYear && (
                    <Text style={[AppStyles.error]}>{errors.endYear}</Text>
                  )}
                </View>
              </View>

              <Input
                iconType="star"
                type="normal"
                placeholder="Enter your grades"
                onChangeText={handleChange('grade')}
                onBlur={handleBlur('grade')}
                value={values.grade}
                keyboardType="number-pad"
              />
              {errors.grade && (
                <Text style={[AppStyles.error]}>{errors.grade}</Text>
              )}
              <View style={styles.btnContainer}>
                <SecondaryButton
                  buttonStyle={{
                    height: 45,
                    marginVertical: 25,
                    elevation: 5,
                    width: (width - 50) / 2,
                  }}
                  height={40}
                  disabled={dataProcessing}
                  title={
                    deleteProcessing ? (
                      <ActivityIndicator color={'#000'} size={20} />
                    ) : (
                      'Delete'
                    )
                  }
                  onPress={() => deleteEducationDetail(values)}
                />
                <PrimaryButton
                  buttonStyle={{
                    height: 45,
                    marginVertical: 25,
                    elevation: 5,
                    width: (width - 50) / 2,
                  }}
                  height={40}
                  disabled={dataProcessing}
                  title={
                    updateProcessing ? (
                      <ActivityIndicator color={'#fff'} size={20} />
                    ) : (
                      'Update'
                    )
                  }
                  onPress={() => handleSubmit()}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EducationDetail;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: width,
    elevation: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  row: {
    display: 'flex',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
