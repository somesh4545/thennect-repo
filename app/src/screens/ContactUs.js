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
import * as Animatable from 'react-native-animatable';

const {height, width} = Dimensions.get('window');

const formValidation = yup.object().shape({
  comment: yup
    .string()
    .min(20, 'Minimum 20 characters required')
    .max(100, 'Maximum 100 characters allowed')
    .required('Required')
    .nullable(),
});

const ContactUs = ({navigation, route}) => {
  const [dataProcessing, setDataProcessing] = useState(false);

  useEffect(() => {
    // console.log()
    // createNavigation();
  }, []);

  const updateInDB = async values => {};

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text
          style={[AppStyles.headingH2, {marginVertical: 10, marginTop: 15}]}>
          Get in touch with Us
        </Text>
        <Animatable.View
          animation={'fadeInUp'}
          duration={500}
          delay={200}
          style={styles.section}>
          <Image
            source={require('../assets/images/contactUs.png')}
            style={styles.img}
          />
          <Formik
            initialValues={{
              comment: '',
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
                  style={[
                    AppStyles.body16,
                    {marginTop: 10, fontWeight: 'bold'},
                  ]}>
                  Comment
                </Text>

                <TextInput
                  placeholder="App is great"
                  placeholderTextColor={'#ddd'}
                  onChangeText={handleChange('comment')}
                  value={values.comment}
                  onBlur={handleBlur('comment')}
                  multiline={true}
                  style={styles.descriptionBox}
                />
                {errors.comment && (
                  <Text style={[AppStyles.error]}>{errors.comment}</Text>
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
                      'Send'
                    )
                  }
                  onPress={() => handleSubmit()}
                />
              </>
            )}
          </Formik>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default ContactUs;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  section: {
    marginTop: 5,
    marginBottom: 30,
  },

  img: {
    width: '100%',
    height: height / 2,
    resizeMode: 'contain',
    // backgroundColor: '#000',
  },
  descriptionBox: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
    color: '#000',
    fontFamily: 'DMSans-Regular',
    minHeight: 100,
  },
});
