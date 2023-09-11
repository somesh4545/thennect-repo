import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import AppStyles from '../../AppStyles';
import BlogCard from './../components/BlogCard';

import CourseCard from './../components/CourseCard';
import coursesData from '../data/coursesData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataLoading from './../components/DataLoading';
import MentorSuggestion from './../components/Home/MentorSuggestion';
import MainActions from './../components/Home/MainActions';

import Toast from 'react-native-toast-message';

import notifee, {
  AndroidImportance,
  AndroidVisibility,
} from '@notifee/react-native';

// sanity client
import BlogsSection from './../components/Home/BlogsSection';
import messaging from '@react-native-firebase/messaging';
import TrendingQNA from '../components/Home/TrendingQNA';
import GradientText from './../components/GradientText';

const {width, height} = Dimensions.get('window');

const Home = ({navigation}) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchBoxPosition = useRef(new Animated.Value(width - 44)).current;
  const searchBoxRef = useRef();

  useEffect(() => {
    fetchData();
    requestUserPermission();
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(1);
      handleNotification(remoteMessage, 1);
    });
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(2);
          handleNotification(remoteMessage, 2);
        }
      });
    messaging().setBackgroundMessageHandler(remoteMessage => {
      console.log(3);
      handleNotification(remoteMessage, 3);
    });
    messaging().onMessage(remoteMessage => {
      console.log(4);
      // console.log(JSON.stringify(remoteMessage)),
      handleNotification(remoteMessage, 4);
    });
  }, []);

  const handleNotification = async (remoteMessage, index) => {
    console.log(remoteMessage);

    // Create a channel (required for Android)
    if (index == 4) {
      Toast.show({
        type: 'info',
        text1: '' + remoteMessage.notification.title,
        text2: '' + remoteMessage.notification.body,
        onPress: () => {
          if (remoteMessage.data.openScreen == 'true') {
            navigation.navigate(remoteMessage.data.screen, {
              id: remoteMessage.data.id,
            });
          }
          Toast.hide();
        },
      });
    } else if (
      remoteMessage &&
      remoteMessage.data &&
      remoteMessage.data.openScreen == 'true'
    ) {
      navigation.navigate(remoteMessage.data.screen, {
        id: remoteMessage.data.id,
      });
    }
  };

  const local = async () => {
    notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId: 'default',
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  };

  async function requestUserPermission() {
    // console.log(token);
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // console.log('Authorization status:', authStatus);
    }
  }

  const fetchData = async () => {
    var s_user = await AsyncStorage.getItem('user');
    s_user = JSON.parse(s_user);
    setUser(s_user);
    setLoading(false);
    // console.log(s_user);
  };

  const showSearchBox = () => {
    if (isSearchActive) {
      searchFun();
    } else {
      searchBoxRef.current.focus();
      Animated.timing(searchBoxPosition, {
        toValue: new Animated.Value(0),
        useNativeDriver: true,
      }).start();
      setIsSearchActive(true);
      // console.log(isSearchActive);
    }
  };

  const closeSearchBox = () => {
    setIsSearchActive(false);
    setSearchTerm(null);
    Animated.timing(searchBoxPosition, {
      toValue: new Animated.Value(width - 44),
      useNativeDriver: true,
    }).start();
  };

  const searchFun = () => {
    if (searchTerm && searchTerm.length > 0) {
      var search = searchTerm;
      console.log(search);
      closeSearchBox();
      navigation.navigate('SearchResult', {searchTerm: search});
    } else {
      alert('Search term is required');
    }
  };

  if (loading) {
    return <DataLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GradientText
          text={'Welcome, ' + user.firstName}
          style={[
            AppStyles.headingH2,
            {fontWeight: '400', textTransform: 'none'},
          ]}
        />
        <Animated.View
          style={[
            styles.searchBox,
            // {left: searchBoxPosition},
            {transform: [{translateX: searchBoxPosition}]},
          ]}>
          <TouchableOpacity onPress={showSearchBox}>
            <FontAwesome name={'search'} size={24} color={'#000'} />
          </TouchableOpacity>
          <TextInput
            ref={searchBoxRef}
            value={searchTerm}
            onChangeText={text => setSearchTerm(text)}
            style={styles.searchInput}
            placeholder={'Search here..'}
            placeholderTextColor={'#ddd'}
            returnKeyType="search"
            returnKeyLabel="search"
            autoFocus={isSearchActive}
            onSubmitEditing={searchFun}
          />
          <TouchableOpacity onPress={closeSearchBox}>
            <FontAwesome name={'close'} size={24} color={'#ddd'} />
          </TouchableOpacity>
        </Animated.View>
        {/* <View style={styles.avatar} /> */}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* user types options */}
        {user.userType == null ? <MainActions fetchData={fetchData} /> : null}

        {/* if the user is mentor */}
        {user.userType && user.userType.type == 'Mentor' ? null : null}

        {/* if the user is mentor */}
        {user.userType &&
        (user.userType.type == 'Mentee' || user.userType.type == 'Both') ? (
          <View style={styles.section}>
            <MentorSuggestion user={user} />
          </View>
        ) : null}

        {/* trending qna */}
        <TrendingQNA />

        {/* blogs for you section */}
        <BlogsSection user={user} />

        {/* Best courses section */}
        <View style={styles.section}>
          <Text style={[AppStyles.headingH3, {marginBottom: 10}]}>
            Best Courses
          </Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            {coursesData.map(course => (
              <CourseCard
                key={course.id}
                data={course}
                width={(width - 60) / 2}
              />
            ))}
          </ScrollView>
        </View>
        <View style={{paddingBottom: 70}} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    paddingTop: 10,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  section: {
    marginBottom: 30,
  },
  card: {
    width: (width - 40) / 3,
    backgroundColor: '#fff',
    padding: 10,
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 10,
    elevation: 5,
  },
  searchBox: {
    backgroundColor: '#FFFF',
    flexDirection: 'row',
    width: width - 20,
    position: 'absolute',
    // left: width - 44,
    alignItems: 'center',
    justifyContent: 'space-between',
    // top: 10,
  },
  searchInput: {
    width: width - 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 5,
    color: '#000',
    fontFamily: 'DMSans-Regular',
    fontSize: 16,
    // flex: 1,
  },
});
