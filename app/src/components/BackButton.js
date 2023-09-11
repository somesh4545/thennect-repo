import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import Constants from '../../Constants';

import Ionicons from 'react-native-vector-icons/Ionicons';

const BackButton = props => {
  const {title, onPress, buttonStyle, style} = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, buttonStyle]}>
      <Ionicons size={24} name={'chevron-back'} color={'#000'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 30,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
