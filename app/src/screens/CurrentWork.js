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
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from './../components/PrimaryButton';

import axios from '../axios/axios';
import CustomDropdown from './../components/CustomDropdown';
import professionTypes from '../data/professionTypes';
import educationBranches from '../data/educationBranches';
import carrerBranches from '../data/carrerBranches';
import Input from './../components/Input';
import Toast from 'react-native-toast-message';

const CurrentWork = ({navigation, route}) => {
  const [user, setUser] = useState();
  const [dataProcessing, setDataProcessing] = useState(false);

  const [profession, setProfession] = useState('');
  const [post, setPost] = useState('');
  const [domain, setDomain] = useState(null);
  const [institution, setInstitution] = useState('');
  const [other, setOther] = useState('');

  useEffect(() => {
    // console.log()
    setInitital();
    createNavigation();
  }, []);

  const setInitital = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setUser(user);
    setProfession(user.currentOperations.profession);
    setPost(user.currentOperations.post);
    setDomain(user.currentOperations.domain);
    setInstitution(user.currentOperations.institution);
    setOther(user.currentOperations.post);
  };

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
              Current work
            </Text>
          </View>
        );
      },
    });
  };

  const updateInDB = async values => {
    setDataProcessing(true);
    if (profession == null) {
      alert('Please select profession');
      // return;
      setDataProcessing(false);
    } else if (profession == 'Other' && other.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Please specify profession',
      });
      setDataProcessing(false);
    } else if (
      profession != 'Other' &&
      (post.length == 0 || domain == null || institution.length == 0)
    ) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required',
      });
      setDataProcessing(false);
    } else {
      var currentOperations = {
        _id: user.currentOperations._id,
        profession,
        post: profession == 'Other' ? other : post,
        domain,
        institution,
      };
      axios
        .patch(`/users/${user._id}/currentOperation`, currentOperations)
        .then(async response => {
          console.log(response.data.data);
          user.currentOperations = response.data.data.currentOperations;
          await AsyncStorage.setItem('user', JSON.stringify(user));
          route.params.callbackFun();
          navigation.goBack();
          setDataProcessing(false);
        })
        .catch(error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: '' + error,
          });
          setDataProcessing(false);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
          Select profession
        </Text>
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
            <Text
              style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
              {profession == 'Education' ? 'Enter branch' : 'Enter post'}
            </Text>
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
            <Text
              style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
              {profession == 'Education' ? 'Select degree' : 'Select domain'}
            </Text>
            <CustomDropdown
              icon={'Safety'}
              data={
                profession == 'Education' ? educationBranches : carrerBranches
              }
              value={domain}
              setValue={setDomain}
              searchable={true}
              placeholder={
                profession == 'Education' ? 'Select degree' : 'Select domain'
              }
            />
            <Text
              style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
              Enter institiute name
            </Text>
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
          <>
            <Text
              style={[AppStyles.body16, {marginTop: 10, fontWeight: 'bold'}]}>
              Enter current work
            </Text>
            <Input
              iconType="outdent"
              type="normal"
              placeholder="Specify"
              onChangeText={setOther}
              value={other}
            />
          </>
        ) : null}

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
          onPress={() => updateInDB()}
        />
      </View>
    </ScrollView>
  );
};

export default CurrentWork;

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
