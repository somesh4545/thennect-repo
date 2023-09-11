import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

import PrimaryButton from './PrimaryButton';
import Lottie from 'lottie-react-native';
import AppStyles from '../../AppStyles';

const {height, width} = Dimensions.get('window');

const Loading = props => {
  const {animationSrc, text, btnText, btnOnPress} = props;
  const redirectTo = screen => {
    // navigation.navigate('');
  };
  return (
    <View style={[styles.centerDiv]}>
      <Lottie
        source={animationSrc}
        autoPlay
        loop
        style={{height: 300, width: 300}}
      />
      <Text style={AppStyles.headingH5}>{text}</Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  centerDiv: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
