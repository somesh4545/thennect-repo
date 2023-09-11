import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import AppStyles from '../../AppStyles';
import {useNavigation} from '@react-navigation/native';
import UserProfile from './UserProfile';
import {convertDateToFormat, convertDateToSimpleFormat} from '../utils/util';
import Moment from 'react-moment';

const {height, width} = Dimensions.get('window');

const ChatMember = props => {
  const navigation = useNavigation();
  const item = props.item;
  const lastMsg = item.lastMsg != null ? JSON.parse(item.lastMsg) : null;
  const otherPerson = item.users.find(x => x._id != props.user);
  const setSelectedChatRoomID = props.setSelectedChatRoomID;
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedChatRoomID(props.item._id);
        navigation.navigate('ChatDetail', {
          data: otherPerson,
          chatRoomID: item._id,
          chatRoomUsers: item.users,
        });
      }}
      style={styles.card}>
      <UserProfile imgDim={50} user={otherPerson} />
      <View style={styles.msgContainer}>
        <View>
          <Text style={[AppStyles.body16Bold]} numberOfLines={1}>
            {otherPerson.firstName}
          </Text>
        </View>

        {lastMsg != null ? (
          <Text style={[AppStyles.row]} numberOfLines={1}>
            <Text style={[styles.last_msg, AppStyles.body14]} numberOfLines={1}>
              {lastMsg.sender_id == props.user ? (
                <Text style={[{fontWeight: 'bold'}, AppStyles.body14]}>
                  You:
                </Text>
              ) : null}{' '}
              {lastMsg.msg}
            </Text>
            <Text style={[AppStyles.body14]}>
              {' '}
              -
              <Moment element={Text} format="LT">
                {item.lastMsgTime}
              </Moment>
            </Text>
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ChatMember;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  last_msg: {
    // backgroundColor: '#ddd',
  },
  msgContainer: {
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: width - 100,
    overflow: 'hidden',
    // alignItems: 'center',
  },
});
