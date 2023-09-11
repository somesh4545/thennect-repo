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

const PrimaryButton = props => {
  const {title, onPress, buttonStyle, style, disabled} = props;

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, buttonStyle]}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#4834D4',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    width: '100%',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'DNSans-Regular',
    color: '#fff',
  },
});

export default PrimaryButton;
