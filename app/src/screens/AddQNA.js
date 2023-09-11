import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from '../axios/axios';
import Toast from 'react-native-toast-message';
import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MultiSelect} from 'react-native-element-dropdown';
import {TextInput} from 'react-native-paper';
import Constants from './../../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddQNA = ({navigation}) => {
  const [question, setQuestion] = useState('');
  const [fields, setFields] = useState([]);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    createNavigation();
    fetchFieldstData();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={AppStyles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
              Ask globally
            </Text>
          </View>
        );
      },
    });
  };

  const addQuestionToDB = async () => {
    setProcessing(true);
    if (
      fields.length == 0 ||
      fieldsArray.length == 0 ||
      question.trim().length <= 0
    ) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
        onPress: () => {
          Toast.hide();
        },
        position: 'bottom',
      });
    } else {
      var user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      const body = {
        user: user._id,
        question: question.trim(),
        categories: fields,
      };
      axios
        .post('/qna', body)
        .then(res => {
          //   console.log(res.data.qnaID);
          navigation.replace('QnADetail', {_id: res.data.qnaID});
          setProcessing(false);
        })
        .catch(error => {
          console.error(error);
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: '' + error,
            onPress: () => {
              Toast.hide();
            },
            position: 'bottom',
          });
          setProcessing(false);
        });
    }
  };

  const fetchFieldstData = () => {
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
        setFieldsArray(data);
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
    <View style={[styles.container]}>
      <TextInput
        multiline={true}
        maxLength={200}
        placeholder="Write your question ..."
        value={question}
        onChangeText={text => setQuestion(text)}
        style={[
          AppStyles.body16,
          {
            backgroundColor: '#fff',
            paddingHorizontal: -10,
            marginVertical: 15,
          },
        ]}
      />
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        activeColor={'#ddd'}
        search
        data={fieldsArray}
        labelField="label"
        valueField="value"
        placeholder="Choose different categories"
        placeholderTextColor={'#ddd'}
        searchPlaceholder="Search..."
        maxSelect={5}
        value={fields}
        onChange={item => {
          setFields(item);
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
      <TouchableOpacity
        onPress={addQuestionToDB}
        style={[AppStyles.center, {marginTop: 30}]}>
        <Text style={[AppStyles.body16Bold, styles.btn]}>
          {processing ? <ActivityIndicator color={'#fff'} size={20} /> : 'Ask'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddQNA;

const styles = StyleSheet.create({
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
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },

  placeholderStyle: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'DMSans-Regular',
  },

  selectedTextStyle: {
    // fontSize: 12,
    color: '#000',
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
