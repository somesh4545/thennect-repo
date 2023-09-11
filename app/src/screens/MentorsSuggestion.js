import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import BackButton from '../components/BackButton';
import Loading from '../components/Loading';
import AppStyles from '../../AppStyles';
import mentorsData from '../data/mentorsData';
import UserListItem from '../components/UserListItem';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../axios/axios';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const MentorsSuggestion = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [mentorsListDb, setMentorsListDb] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    createNavigation();
    findMentors();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={styles.header}>
            <BackButton onPress={() => navigation.goBack()} />
            <View>
              <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
                Mentors
              </Text>
              <Text style={AppStyles.body14}>
                Chat with any mentor for free!
              </Text>
            </View>
          </View>
        );
      },
    });
  };

  const findMentors = async () => {
    var user = await AsyncStorage.getItem('user');
    user = JSON.parse(user);
    const fields = '_id,img_url,bgColor,oneLiner,createdAt,firstName';
    axios
      .get(
        `/users/${user._id}/suggestMentors?fields=${fields}&limit=16&sort=-createdAt&page=${page}`,
      )
      .then(res => {
        var {data, count, page, limit, skip} = res.data;
        data = JSON.parse(data);
        if (!data) {
          setLoadMore(false);
        } else if (data.length == 0) {
          setLoadMore(false);
          setPage(-1);
        } else {
          data.map(u => {
            setMentorsListDb(prev => [...prev, u]);
          });
          setPage(page => page + 1);
          if (count < limit) {
            setLoadMore(false);
            setPage(-1);
          }
        }
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        Toast.show({
          type: 'error',
          text1: 'Error occured',
          text2: '' + error,
        });
      });
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading
          animationSrc={require('../assets/animations/finding.json')}
          text={'Finding best mentors :)'}
        />
      ) : (
        <>
          <Animated.FlatList
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: scrollY}}}],
              {useNativeDriver: true},
            )}
            data={mentorsListDb}
            contentContainer={styles.mentorslist}
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
                <Animatable.View
                  animation={'fadeInUp'}
                  duration={300}
                  delay={50 * index}>
                  <Animated.View style={{opacity, transform: [{scale}]}}>
                    <UserListItem item={item} />
                  </Animated.View>
                </Animatable.View>
              );
            }}
            ListFooterComponent={<View style={{height: 100}}></View>}
            keyExtractor={item => item._id}
          />
          {loadMore ? (
            <View
              style={[
                AppStyles.center,
                {marginVertical: 10, marginBottom: 20},
              ]}>
              <TouchableOpacity onPress={findMentors}>
                <Text>Load more</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
};

export default MentorsSuggestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: width,
    // paddingHorizontal: 10,
    // elevation: 10,
    backgroundColor: '#fff',
  },
  imageBg: {
    flex: 1,
  },
  mentorslist: {
    marginTop: 20,
    // padding: 20,
    // paddingBottom: 210,
    // marginBottom: 200,
    // flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    display: 'flex',
    alignItems: 'center',

    // backgroundColor: '#fff',
  },
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  last_msg: {
    maxWidth: width - 130,
    // backgroundColor: '#000',
  },
});
