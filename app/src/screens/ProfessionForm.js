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
import BackButton from '../components/BackButton';
import AppStyles from '../../AppStyles';

import {Formik} from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import PrimaryButton from '../components/PrimaryButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Input from '../components/Input';
import {TextInput} from 'react-native-paper';

import axios from '../axios/axios';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const expData = [
  {label: '0 years', value: '1'},
  {label: '1-3 years', value: '2'},
  {label: 'More than 3 years', value: '3'},
];

const professionData = [
  {label: 'Mentor', value: 'Mentor'},
  {label: 'Mentee', value: 'Mentee'},
  {label: 'Both', value: 'Both'},
];

const ProfessionForm = ({navigation, route}) => {
  const index = professionData.findIndex(
    pro => pro.value == route.params.userType,
  );
  const [professionType, setProfessionType] = useState(professionData[index]);
  const [fields, setFields] = useState([]);
  const [fieldsArray, setFieldsArray] = useState([]);
  const [answer, setAnswer] = useState('');
  const [yearsOfExp, setYearsOfExp] = useState(null);
  const [dataProcessing, setDataProcessing] = useState(false);

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
          <View style={styles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
              Profession form
            </Text>
          </View>
        );
      },
    });
  };

  const addProfessionToDB = async () => {
    setDataProcessing(true);
    if (
      fields.length == 0 ||
      fieldsArray.length == 0 ||
      (professionType.label != 'Mentee' && yearsOfExp == null) ||
      (professionType.label != 'Mentee' &&
        (answer == null || answer.trim().length == 0))
    ) {
      Toast.show({
        type: 'error',
        text1: 'ALl fields are required',
      });
      setDataProcessing(false);
      return;
    }
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (professionType.label != 'Mentee') {
      const body = {
        user: user._id,
        question: 'What is the approval rate?',
        answer: answer,
      };
      axios
        .post(`/users/${user._id}/mentor`, body)
        .then(res => {})
        .catch(error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: '' + error,
          });
        });
    }
    const data = {
      userType: {
        type: professionType.label,
        fields: fields,
        experience: professionType.label == 'Mentee' ? null : yearsOfExp.label,
      },
    };
    console.log(data);
    axios
      .patch(`/users/${user._id}`, data)
      .then(async response => {
        const data = response.data.data;
        await AsyncStorage.setItem('user', data);
        route.params.callbackFun();
        if (
          professionType.label == 'Mentee' ||
          professionType.label == 'Both'
        ) {
          navigation.replace('MentorsSuggestion');
        } else {
          navigation.goBack();
        }
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
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={[AppStyles.body16Bold, {marginTop: 20}]}>
          Profession type
        </Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={professionData}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Mentee, Mentor"
          value={professionType.value}
          onChange={item => {
            setProfessionType(item);
            console.log(item.value);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="rocket1"
              size={20}
            />
          )}
        />

        <Text style={[AppStyles.body16Bold, {marginTop: 20}]}>
          Looking for <Text style={{fontSize: 10}}>(max 5)</Text>
        </Text>
        {fieldsArray.length == 0 ? (
          <ActivityIndicator size="small" color="black" />
        ) : (
          <MultiSelect
            activeColor={'#ddd'}
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={fieldsArray}
            labelField="label"
            valueField="value"
            placeholder="Choose different fields"
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
        )}

        {professionType.value == 'Mentor' || professionType.value == 'Both' ? (
          <>
            <Text style={[AppStyles.body16Bold, {marginTop: 20}]}>
              Select years of experience
            </Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={expData}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Years of experience"
              value={yearsOfExp && yearsOfExp.value}
              onChange={item => {
                setYearsOfExp(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="linechart"
                  size={20}
                />
              )}
            />
            <Text style={[AppStyles.body16Bold, {marginTop: 20}]}>
              Question based on certain scenario answer properly
            </Text>
            <TextInput
              multiline={true}
              maxLength={300}
              placeholder="Write your answer ..."
              value={answer}
              onChangeText={text => setAnswer(text)}
              style={[
                AppStyles.body16,
                {
                  backgroundColor: '#fff',
                  paddingHorizontal: -10,
                },
              ]}
            />
          </>
        ) : null}

        <PrimaryButton
          buttonStyle={{height: 45, marginVertical: 25, elevation: 5}}
          height={40}
          disabled={dataProcessing}
          title={
            dataProcessing ? (
              <ActivityIndicator color={'#fff'} size={20} />
            ) : (
              'Start your journey'
            )
          }
          onPress={() => addProfessionToDB()}
        />
      </View>
    </ScrollView>
  );
};

export default ProfessionForm;

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
});
