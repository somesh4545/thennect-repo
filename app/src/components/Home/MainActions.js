import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppStyles from '../../../AppStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const MainActions = props => {
  const navigation = useNavigation();
  const {fetchData} = props;
  const redirectToProfession = async userType => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    if (user.education.length == 0 || user.interests.length == 0) {
      Toast.show({
        type: 'info',
        text1: 'Please complete your profile before starting new journey',
        onPress: () => {
          Toast.hide();
        },
        position: 'bottom',
      });
      navigation.navigate('Main', {screen: 'Profile'});
      return;
    }
    navigation.navigate('ProfessionForm', {userType, callbackFun: fetchData});
  };
  return (
    <View style={styles.section}>
      <Text style={AppStyles.headingH2}>What will you like to do today ?</Text>
      <View style={[AppStyles.row, {marginTop: 10}]}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => redirectToProfession('Mentor')}>
          <View style={styles.avatar} />
          <Text style={AppStyles.body16Bold}>Be Mentor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.card, {marginHorizontal: 10}]}
          onPress={() => redirectToProfession('Mentee')}>
          <View style={styles.avatar} />
          <Text style={AppStyles.body16Bold}>Be Mentee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => redirectToProfession('Both')}>
          <View style={styles.avatar} />
          <Text style={AppStyles.body16Bold}>Do Both</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainActions;

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  section: {
    marginBottom: 30,
  },
  card: {
    width: (width - 40) / 3,
    backgroundColor: '#fff',
    padding: 10,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    elevation: 5,
  },
});
