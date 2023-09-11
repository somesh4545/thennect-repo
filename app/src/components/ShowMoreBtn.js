import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AppStyles from '../../AppStyles';
import Entypo from 'react-native-vector-icons/Entypo';
import Constants from './../../Constants';

const ShowMoreBtn = props => {
  return (
    <View style={AppStyles.center}>
      <TouchableOpacity onPress={props.onPress} style={styles.btn}>
        <Text style={[AppStyles.body14, {color: Constants.colour.primary}]}>
          {props.text} <Entypo name="chevron-right" size={16} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShowMoreBtn;

const styles = StyleSheet.create({
  btn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
});
