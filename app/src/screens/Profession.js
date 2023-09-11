import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataLoading from './../components/DataLoading';
import Toast from 'react-native-toast-message';
import axios from '../axios/axios';
import Lottie from 'lottie-react-native';

const Profession = ({navigation}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [application, setApplication] = useState();

  useEffect(() => {
    createNavigation();
    getInitialData();
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
              Profession
            </Text>
          </View>
        );
      },
    });
  };

  const getInitialData = async () => {
    var asUser = await AsyncStorage.getItem('user');
    asUser = JSON.parse(asUser);
    setUser(asUser);
    if (asUser.userType.type != 'Mentee') {
      axios
        .get(`/users/${asUser._id}/mentor`)
        .then(res => {
          setApplication(res.data.data);
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: '' + error,
          });
        });
    } else {
      setLoading(false);
    }
  };

  if (loading) {
    return <DataLoading />;
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Text style={AppStyles.body16Bold}>
          Registered with The Nnect as{' '}
          {user.userType.type == 'Both'
            ? 'Both Mentor and Mentee'
            : user.userType.type}
        </Text>
        {/* <TouchableOpacity>
          <Text style={[AppStyles.link, {fontSize: 14}]}>Change</Text>
        </TouchableOpacity> */}
        {user.userType.type != 'Mentee' ? (
          <View style={{marginTop: 20}}>
            <Text style={AppStyles.headingH2}>Application details</Text>
            <View style={AppStyles.center}>
              <Lottie
                source={
                  application.approvalStatus == true
                    ? require('../assets/animations/approve.json')
                    : application.approvalStatus == false
                    ? require('../assets/animations/reject.json')
                    : require('../assets/animations/pending.json')
                }
                autoPlay
                loop={false}
                style={{
                  height: 200,
                  width: 200,
                  marginVertical: 10,
                  marginBottom: 15,
                }}
              />
            </View>
            <Text style={AppStyles.body16}>
              <Text style={AppStyles.body16Bold}>Question:</Text>{' '}
              {application.question}
            </Text>
            <Text style={[AppStyles.body16, {marginVertical: 10}]}>
              <Text style={AppStyles.body16Bold}>Answer given:</Text>{' '}
              {application.answer}
            </Text>
            {application.approvalStatus != null ? (
              <>
                <Text style={AppStyles.body16}>
                  <Text style={AppStyles.body16Bold}>Rating:</Text>{' '}
                  {application.rating}
                </Text>
                <Text style={AppStyles.body16}>
                  <Text style={AppStyles.body16Bold}>Comment:</Text>{' '}
                  {application.comment}
                </Text>
                <Text style={AppStyles.body16}>
                  <Text style={AppStyles.body16Bold}>Application status:</Text>{' '}
                  {application.approvalStatus == true
                    ? 'Approved'
                    : 'Not Approved'}
                </Text>
              </>
            ) : (
              <Text style={[AppStyles.body16Bold, {marginTop: 10}]}>
                Yet to be approved
              </Text>
            )}
          </View>
        ) : null}
        <View style={{marginTop: 50}}>
          <Text style={AppStyles.headingH3}>Guidelines</Text>
          <Text style={AppStyles.body16}>
            In publishing and graphic design, Lorem ipsum is a placeholder text
            commonly used to demonstrate the visual form of a document or a
            typeface without relying on meaningful content. Lorem ipsum may be
            used as a placeholder before final copy is available.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
