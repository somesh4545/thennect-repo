import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';

import AppStyles from '../../AppStyles';

import chatMembersData from '../data/chatMembersData';
import ChatMember from './../components/ChatMember';
import axios from '../axios/axios';
import DataLoading from './../components/DataLoading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import {socket} from '../lib/socket';
import NoData from './../components/NoData';
import {connect} from 'formik';
import {useFocusEffect} from '@react-navigation/native';
import GradientText from './../components/GradientText';

const Chats = ({navigation}) => {
  // console.log(chatMembersData);
  const [loading, setLoading] = useState(true);
  const [USER, setUSER] = useState();
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatMembersArray, setChatMembersArray] = useState([]);
  const [selectedChatRoomID, setSelectedChatRoomID] = useState(null);

  // useEffect(() => {
  // }, []);
  useFocusEffect(
    useCallback(() => {
      connect();
      fetchInitialArray();
    }, []),
  );

  const connect = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    socket.emit('setup', {_id: user._id});
    socket.on('connected', () => setSocketConnected(true));
  };

  useEffect(() => {
    socket.on('message_recieved', payload => {
      payload = JSON.parse(payload);
      if (
        payload.chatRoomID != selectedChatRoomID &&
        selectedChatRoomID != null
      ) {
        Toast.show({
          type: 'info',
          text1: 'New message from ' + payload.chatName,
          text2: '' + payload.msg,
        });
      }
      fetchInitialArray();
    });
  });

  const fetchInitialArray = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    setUSER(user._id);
    axios
      .get(`/chats/user/${user._id}?sort=-lastMsgTime&fields=_id,lastMsg`)
      .then(response => {
        setChatMembersArray(response.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + err,
        });
      });
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  if (loading) {
    return <DataLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <GradientText
        style={[AppStyles.headingH2, {marginBottom: 10}]}
        text={'Your Chats'}
      />
      {chatMembersArray.length == 0 ? (
        <NoData
          animationSrc={require('../assets/animations/noEducation.json')}
          text={'No chat found'}
          btnText={'Chat now'}
          btnVisible={false}
          // btnOnPress={'Main'}
        />
      ) : (
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          data={chatMembersArray}
          contentContainer={styles.chatMembers}
          renderItem={({item, index}) => {
            const inputRange = [-1, 0, 70 * index, 70 * (index + 2)];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            const inputRangeOpacity = [-1, 0, 70 * index, 70 * (index + 1)];
            const opacity = scrollY.interpolate({
              inputRange: inputRangeOpacity,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View style={{opacity, transform: [{scale}]}}>
                <ChatMember
                  setSelectedChatRoomID={setSelectedChatRoomID}
                  user={USER}
                  item={item}
                />
              </Animated.View>
            );
          }}
          ListFooterComponent={<View style={{height: 100}}></View>}
          keyExtractor={item => item._id}
        />
      )}
      {/* <View style={{height: 70}} /> */}
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 0,
  },
  chatMembers: {
    marginTop: 20,
    // paddingBottom: 210,
    // marginBottom: 200,
    // flex: 1,
  },
});
