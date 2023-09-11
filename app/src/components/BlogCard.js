import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import AppStyles from '../../AppStyles';
import {useNavigation} from '@react-navigation/native';

import {urlFor} from '../lib/client';

const BlogCard = props => {
  const navigation = useNavigation();
  // console.log(props.data._id);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('BlogDetail', {id: props.data._id})}
      style={[styles.card, {width: props.width}]}>
      <Image
        style={[styles.img, {width: props.width}]}
        source={{uri: urlFor(props.data.mainImage).url()}}
      />
      {/* <View> */}
      <Text style={[AppStyles.body16Bold, {marginTop: 5}]} numberOfLines={1}>
        {props.data.title}
      </Text>
      <Text numberOfLines={2} style={AppStyles.body12}>
        {props.data.subtitle}
      </Text>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default BlogCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 5,
  },
  img: {
    height: 150,
    resizeMode: 'stretch',
    borderRadius: 20,
  },
});
