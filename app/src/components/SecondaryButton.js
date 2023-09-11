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

const SecondaryButton = props => {
  const {title, onPress, buttonStyle, style} = props;

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, buttonStyle]}>
      <Text style={[styles.text, style]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // elevation: 4,
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'DNSans-Regular',
    color: '#000',
  },
});

export default SecondaryButton;
