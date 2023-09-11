import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  BackHandler,
} from 'react-native';

import React, {useEffect, useState, useRef} from 'react';
import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import SenderMsg from '../components/SenderMsg';
import ReceiverMsg from './../components/ReceiverMsg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SharedElement} from 'react-navigation-shared-element';
import {convertDateToSimpleFormat} from '../utils/util';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios/axios';
import Toast from 'react-native-toast-message';
import {socket} from '../lib/socket';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Button, Menu, Divider, Provider} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

const ChatDetail = ({navigation, route}) => {
  var i = 1,
    page = 1;
  const scrollViewRef = useRef();
  const {_id, bgColor, img_url, firstName} = route.params.data;
  const chatRoomID = route.params.chatRoomID;
  const chatRoomUsers = route.params.chatRoomUsers;
  const [user, setUser] = useState();
  const [msg, setMsg] = useState(null);
  const [msgsCollection, setMsgsCollection] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingMsg, setSendingMsg] = useState(false);

  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  useEffect(() => {
    getChatRoomMsgs();
    getUser();
    createNavigation();
    if (socket.connected == false) {
      socketConnect();
    }
    socket.emit('join_room', chatRoomID);
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    socket.emit('exit_room', chatRoomID);
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    socket.on('message_recieved', payload => {
      payload = JSON.parse(payload);
      if (payload.chatRoomID == chatRoomID) {
        setMsgsCollection([
          ...msgsCollection,
          {
            msg: payload.msg,
            time: payload.time,
            sender_id: payload.sender_id,
          },
        ]);
      } else {
        Toast.show({
          type: 'info',
          text1: 'Message from ' + payload.chatName,
          text2: '' + payload.msg,
          onPress: () => {
            Toast.hide();
          },
        });
      }
    });
  });

  const getUser = async () => {
    var u = await AsyncStorage.getItem('user');
    u = JSON.parse(u);
    setUser(u);
  };

  const socketConnect = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    socket.emit('setup', {_id: user._id});
  };

  const getChatRoomMsgs = () => {
    setLoading(true);
    axios
      .get(`/chats/chatRoom/${chatRoomID}?page=${page}`)
      .then(response => {
        var msgs = response.data.msg;
        msgs = JSON.parse(msgs);
        // console.log('Msg length ' + msgs.length);
        if (msgs.length == 0) {
          page = -1;
          Toast.show({
            type: 'info',
            text1: 'No old messages',
          });
        }
        msgs.map(msg => {
          msg = JSON.parse(msg);
          setMsgsCollection(msgsData => [
            {
              msg: msg.msg,
              time: msg.time,
              sender_id: msg.sender_id,
            },
            ...msgsData,
          ]);
        });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + err,
        });
        setLoading(false);
      });
  };

  const sendMsg = async () => {
    if (msg != null && loading == false) {
      setSendingMsg(true);
      var u = await AsyncStorage.getItem('user');
      u = JSON.parse(u);
      socket.emit(
        'new_message',
        JSON.stringify({
          chatRoomID,
          chatName: u.firstName,
          sender_id: u._id,
          msg: msg.trim(),
          users: chatRoomUsers,
          time: Date.now(),
        }),
      );
      axios
        .post(`/chats/chatRoom/${chatRoomID}`, {
          sender_id: u._id,
          msg: msg.trim(),
        })
        .then(response => {
          setMsgsCollection([
            ...msgsCollection,
            {
              msg: msg.trim(),
              time: response.data.time,
              sender_id: u._id,
            },
          ]);

          setMsg(null);
          setSendingMsg(false);
        })
        .catch(err => {
          console.log(err);
          Toast.show({
            type: 'error',
            text1: 'Error occured',
            text2: '' + err,
          });
          setSendingMsg(false);
        });
    }
  };

  const onRefresh = React.useCallback(() => {
    // setLoading(true);
    if (page > 0) {
      page++;

      getChatRoomMsgs();
    }
    // wait(2000).then(() => setLoading(false));
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',

      headerLeft: () => (
        <View style={styles.header}>
          <BackButton
            onPress={() => {
              socket.emit('exit_room', chatRoomID);
              navigation.goBack();
            }}
          />
          <TouchableOpacity
            style={[AppStyles.row, {alignItems: 'center'}]}
            onPress={() => {
              navigation.navigate('UserDetail', {userId: _id, chatNow: false});
            }}>
            {img_url == null ? (
              <View
                style={[
                  styles.profileImg,
                  AppStyles.center,
                  {backgroundColor: bgColor},
                ]}>
                <Text style={[AppStyles.headingH2, {color: '#fff'}]}>
                  {firstName.slice(0, 1)}
                </Text>
              </View>
            ) : (
              <Image source={{uri: img_url}} style={[styles.profileImg]} />
            )}
            {/* <Image source={{uri: img_url}} style={styles.profileImg} /> */}
            <Text style={AppStyles.headingH3}>{firstName}</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* {loading ? (
        <ActivityIndicator color={'#000'} style={{alignItems: 'center'}} />
      ) : null} */}

      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 30}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={onRefresh} />
        }
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        {msgsCollection.map(msgContent => {
          i++;
          if (msgContent.sender_id != user._id) {
            return (
              <ReceiverMsg
                key={i}
                msg={msgContent.msg}
                time={msgContent.time}
              />
            );
          } else {
            return (
              <SenderMsg key={i} msg={msgContent.msg} time={msgContent.time} />
            );
          }
        })}
      </ScrollView>
      <View style={styles.msgContainer}>
        <KeyboardAvoidingView style={styles.msgBox}>
          <TextInput
            placeholder={'Type here..'}
            placeholderTextColor={'#ddd'}
            style={styles.input}
            onChangeText={text => setMsg(text)}
            value={msg}
          />
          <TouchableOpacity onPress={sendMsg} disabled={sendingMsg}>
            <LinearGradient
              style={styles.sendBtn}
              colors={['#4834D4', '#BE2EDD']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Ionicons name="send" size={20} color={'#fff'} />
            </LinearGradient>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 0.9,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 20,
    // alignItems: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: width,
    elevation: 10,
  },
  profileImg: {
    height: 40,
    width: 40,
    borderRadius: 50,
    marginLeft: 10,
    marginRight: 15,
  },
  msgContainer: {
    flex: 0.1,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  msgBox: {
    marginHorizontal: 10,
    width: width - 40,
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 4,
    // justifyContent: 'center',
  },
  input: {
    width: width - 90,
    height: 40,
    padding: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    color: '#000',
  },
  sendBtn: {
    width: 50,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderTopRightRadius: 0,
  },
});
