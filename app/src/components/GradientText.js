import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {LinearTextGradient} from 'react-native-text-gradient';

const GradientText = props => {
  const {text, style} = props;
  return (
    <LinearTextGradient
      style={style}
      locations={[0, 1]}
      colors={['#be2edd', '#4834d4']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <Text>{text}</Text>
    </LinearTextGradient>
  );
};

export default GradientText;

const styles = StyleSheet.create({});
