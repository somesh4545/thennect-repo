import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import BackButton from './../components/BackButton';
import AppStyles from '../../AppStyles';
import * as Animatable from 'react-native-animatable';
import NoData from './../components/NoData';
import educationListData from '../data/educationListData';
import {generateRandomColor} from '../utils/util';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Constants from './../../Constants';
import EducationCard from '../components/EducationCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DataLoading from './../components/DataLoading';

// use in server to update education detail
// Person.update({'items.id': 2}, {'$set': {
//     'items.$.name': 'updated item2',
//     'items.$.value': 'two updated'
// }},

const {height, width} = Dimensions.get('window');

const Education = ({navigation, route}) => {
  const [educationList, setEducationList] = useState(educationListData);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    createNavigation();
    fetchData();
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, []);

  const backAction = () => {
    route.params.callbackFun();
    navigation.goBack();
    return true;
  };

  const fetchData = async () => {
    setLoading(true);
    var s_user = await AsyncStorage.getItem('user');
    s_user = JSON.parse(s_user);
    setUser(s_user);
    setLoading(false);
    // console.log(s_user);
  };

  const createNavigation = () => {
    navigation.setOptions({
      title: '',
      headerLeft: () => (
        <View style={styles.header}>
          <BackButton
            onPress={() => {
              route.params.callbackFun();
              navigation.goBack();
            }}
          />
          {/* <Image source={{uri: img_url}} style={styles.profileImg} /> */}
          <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
            Education
          </Text>
        </View>
      ),
    });
  };

  if (loading) {
    return <DataLoading />;
  }

  return (
    <View style={{flex: 1}}>
      {user.education.length == 0 ? (
        <NoData
          animationSrc={require('../assets/animations/noEducation.json')}
          text={'No education detail found'}
          btnText={'Add education'}
          btnOnPress={'AddEducation'}
          callbackFun={fetchData}
        />
      ) : (
        <View style={styles.container}>
          <FlatList
            data={user.education}
            refreshing={loading}
            onRefresh={fetchData}
            contentContainer={styles.flatList}
            renderItem={({item, index}) => {
              //   console.log(item);
              return (
                <EducationCard
                  item={item}
                  index={index}
                  disabled={false}
                  callbackFun={fetchData}
                />
              );
            }}
            ListFooterComponent={<View style={{height: 100}}></View>}
            keyExtractor={item => item._id}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('AddEducation', {callbackFun: fetchData})
            }
            style={[styles.fab, AppStyles.center]}>
            <FontAwesome name="plus" size={20} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Education;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: width,
    elevation: 10,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Constants.colour.primary,
    zIndex: 100,
  },
});
