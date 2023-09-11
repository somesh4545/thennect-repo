import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import UserProfile from './UserProfile';
import AppStyles from '../../AppStyles';
import {convertDateToFormat} from '../utils/util';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const QNACard = props => {
  const navigation = useNavigation();
  const {_id, commentsCount, question, user, categories, createdAt} =
    props.data;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('QnADetail', {_id: _id});
      }}
      style={[styles.card]}>
      <UserProfile user={user} imgDim={50} />
      <View style={{marginLeft: 5}}>
        <Text style={[AppStyles.body16Bold]} numberOfLines={1}>
          {user.firstName}
        </Text>
        <Text
          style={[AppStyles.body14, {paddingVertical: 3, width: width - 80}]}
          numberOfLines={2}>
          {question}
        </Text>
        <Text style={[AppStyles.body12]} numberOfLines={1}>
          {commentsCount} replies, asked on {convertDateToFormat(createdAt)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default QNACard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    width: width - 20,
    marginHorizontal: 5,
  },
});
