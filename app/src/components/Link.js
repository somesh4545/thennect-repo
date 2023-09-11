import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Link = props => {
  const {text, onPress, orientation} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.link}>
        <Text style={[styles.text, {textAlign: orientation}]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: 'DMSans-Bold',
    color: '#0029FF',
  },
});
