import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React from 'react';

import AppStyles from '../../AppStyles';
import Constants from '../../Constants';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';

const CourseCard = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        Toast.show({
          type: 'info',
          text1: 'Will be redirected to seller site',
          onPress: () => {
            Toast.hide();
          },
          position: 'bottom',
        })
      }
      style={[styles.card, {width: props.width}]}>
      <Image
        style={[styles.img, {width: props.width}]}
        source={{uri: props.data.img_url}}
      />
      <View style={{marginTop: 5}}>
        <Text style={AppStyles.body12} numberOfLines={1}>
          {props.data.seller}
        </Text>
        <Text style={AppStyles.body16Bold} numberOfLines={1}>
          {props.data.course_name}
        </Text>
        <Text numberOfLines={1} style={AppStyles.body14}>
          <FontAwesome
            name={'rupee'}
            size={14}
            color={Constants.colour.primary}
          />
          {props.data.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 5,
  },
  img: {
    height: 150,
    borderRadius: 20,
    resizeMode: 'stretch',
    // overflow: 'hidden',
  },
});
