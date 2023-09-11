import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';

import Loading from './../components/Loading';
import AppStyles from '../../AppStyles';
import mentorsData from '../data/mentorsData';
import UserListItem from '../components/UserListItem';
import * as Animatable from 'react-native-animatable';
import BackButton from './../components/BackButton';
import axios from '../axios/axios';
import Toast from 'react-native-toast-message';

const {height, width} = Dimensions.get('window');

const SearchResult = ({navigation, route}) => {
  const [searchTerm, setSearchTerm] = useState(route.params.searchTerm);
  const [loading, setLoading] = useState(true);
  const [mentorsListDb, setMentorsListDb] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [page, setPage] = useState(1);

  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    createNavigation();
    search();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      title: '',
      headerShown: true,
      headerLeft: () => (
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />
          {/* <Image source={{uri: img_url}} style={styles.profileImg} /> */}
          <Text style={AppStyles.headingH3} numberOfLines={1}>
            Search Results
          </Text>
        </View>
      ),
    });
  };

  const search = () => {
    if (loadMore == false || page == -1) return;
    console.log('oage ' + page);
    const fields = '_id,img_url,bgColor,firstName,oneLiner,createdAt';
    axios
      .get(
        `/users/?searchTerm=${searchTerm}&fields=${fields}&page=${page}&limit=16&sort=-createdAt`,
      )
      .then(res => {
        var {data, count, p, limit, skip} = res.data;
        console.log(count, limit);
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
          animationSrc={require('../assets/animations/search2.json')}
          text={'Finding best results :)'}
        />
      ) : mentorsListDb.length > 0 ? (
        <>
          <Text style={[AppStyles.body16, {marginVertical: 15}]}>
            Search term: {searchTerm}
          </Text>
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
              <TouchableOpacity onPress={search}>
                <Text>Load more</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      ) : (
        <>
          <Text style={[AppStyles.body16, {marginVertical: 15}]}>
            Search term: {searchTerm}
          </Text>
          <Loading
            animationSrc={require('../assets/animations/noEducation.json')}
            text={'No user found :)'}
          />
        </>
      )}
    </View>
  );
};

export default SearchResult;

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
    elevation: 10,
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
