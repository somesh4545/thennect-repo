import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import React from 'react';

import AppStyles from '../../AppStyles';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from './../components/SecondaryButton';

const {width, height} = Dimensions.get('window');

const GetStarted = ({navigation}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.upperContainer, AppStyles.center]}>
        <Image
          source={require('../assets/images/hero.png')}
          style={styles.heroImg}
        />
      </View>
      <View style={styles.lowerContainer}>
        <View style={styles.textContainer}>
          <Text style={AppStyles.headingH1}>Welcome</Text>
          <Text style={AppStyles.body14}>
            The Nnect is an open network with professionals and students from
            150+ streams signed up and volunteering to help individuals with
            mentoring in a wide range of industries, from across the world.
          </Text>
        </View>
        <PrimaryButton
          title={'Get Started'}
          buttonStyle={{marginVertical: 5, marginTop: 30}}
          onPress={() => navigation.replace('Signup')}
        />
        <SecondaryButton
          title={'Login'}
          onPress={() => navigation.replace('Login')}
        />
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  upperContainer: {
    // flex: 1,
    // height: height / 2,
  },
  heroImg: {
    width: '100%',
    height: height / 2,
    resizeMode: 'contain',
  },
  lowerContainer: {
    // flex: 1,
    // height: height / 2,
    // padding: 20,
    paddingHorizontal: 20,
    // backgroundColor: '#000',
  },
});
