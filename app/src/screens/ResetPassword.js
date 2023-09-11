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
} from 'react-native';
import React, {useEffect, useState} from 'react';

import AppStyles from '../../AppStyles';
import BackButton from '../components/BackButton';
import Input from '../components/Input';
import Link from './../components/Link';
import PrimaryButton from './../components/PrimaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const ResetPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [resetProcessing, setresetProcessing] = useState(false);

  const resetPassword = () => {
    setresetProcessing(true);
    setTimeout(() => {
      setresetProcessing(false);
      navigation.replace('Login');
    }, 2000);
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={[AppStyles.container, styles.container]}>
        <BackButton onPress={() => navigation.goBack()} />
        <Image
          source={require('../assets/images/reset_password.png')}
          style={styles.img}
        />
        <View style={styles.form}>
          <Text style={[AppStyles.headingH1, {marginBottom: 5}]}>
            Reset Password
          </Text>

          <Input
            iconName="password"
            value={password}
            type="password"
            secureTextEntry={secureTextEntry1}
            placeholder="Password"
            onPress={() => setSecureTextEntry1(!secureTextEntry1)}
            onChangeText={text => setPassword(text)}
          />

          <Input
            iconName="confirmPassword"
            value={confirmPassword}
            type="password"
            secureTextEntry={secureTextEntry2}
            placeholder="Confirm password"
            onPress={() => setSecureTextEntry2(!secureTextEntry2)}
            onChangeText={text => setConfirmPassword(text)}
          />

          <PrimaryButton
            buttonStyle={{marginVertical: 25, elevation: 5}}
            height={40}
            disabled={resetProcessing}
            title={
              resetProcessing ? (
                <ActivityIndicator color={'#fff'} size={20} />
              ) : (
                'Continue'
              )
            }
            onPress={() => {
              resetPassword();
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  img: {
    width: '100%',
    height: height / 2,
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
