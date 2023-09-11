import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {convertDateToFormat, generateRandomColor} from '../utils/util';
import AppStyles from '../../AppStyles';

const {height, width} = Dimensions.get('window');

const UserListItem = props => {
  const navigation = useNavigation();
  const {item} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('UserDetail', {userId: item._id})}
      style={styles.card}>
      <View style={styles.left}>
        {item.img_url == null ? (
          <View
            style={[
              styles.avatar,
              AppStyles.center,
              {backgroundColor: item.bgColor},
            ]}>
            <Text style={[AppStyles.headingH2, {color: '#fff'}]}>
              {item.firstName.slice(0, 1)}
            </Text>
          </View>
        ) : (
          <Image source={{uri: item.img_url}} style={styles.avatar} />
        )}
      </View>
      <View style={styles.right}>
        <Text style={AppStyles.body16Bold}>{item.firstName}</Text>
        <Text style={AppStyles.body14} numberOfLines={1}>
          {item.oneLiner}
        </Text>
        <Text style={AppStyles.body14} numberOfLines={1}>
          {convertDateToFormat(item.createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserListItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',
  },
  left: {
    marginRight: 10,
  },
  right: {
    width: width - 100,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
