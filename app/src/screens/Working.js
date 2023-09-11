import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AppStyles from '../../AppStyles';
import * as Animatable from 'react-native-animatable';

import BackButton from './../components/BackButton';

const {height, width} = Dimensions.get('window');

const Working = ({navigation, route}) => {
  useEffect(() => {
    // console.log()
    createNavigation();
  }, []);

  const createNavigation = () => {
    navigation.setOptions({
      headerShown: true,
      title: '',
      headerLeft: () => {
        return (
          <View style={AppStyles.header}>
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
            <Text style={[AppStyles.headingH3, {fontWeight: '200'}]}>
              How to use The Nnect
            </Text>
          </View>
        );
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.container}>
        <Animatable.View
          animation={'fadeInUp'}
          duration={500}
          delay={200}
          style={styles.section}>
          <Text style={AppStyles.headingH3}>
            1. Sign up and make your mentoring profile
          </Text>
          <Image
            source={{uri: 'https://www.thennect.com/working1.png'}}
            style={styles.img}
          />
          <Text style={[AppStyles.body14, {marginVertical: 5}]}>
            The Nnect is an open network with professionals and students from
            150+ streams signed up and volunteering to help individuals with
            mentoring in a wide range of industries, from across the world.
            Whether a student, professional, freelancer, or entrepreneur can
            benefit from this platform.
          </Text>
          <Text style={AppStyles.body14}>
            Create your profile within a minute, choose whether you would like
            to volunteer to be a mentor, find yourself a mentor, or both.
          </Text>
        </Animatable.View>
        <Animatable.View
          animation={'fadeInUp'}
          duration={500}
          delay={350}
          style={styles.section}>
          <Text style={AppStyles.headingH3}>
            2. Find your mentoring connection
          </Text>
          <Image
            source={{uri: 'https://www.thennect.com/working3.png'}}
            style={styles.img}
          />
          <Text style={[AppStyles.body14, {marginVertical: 5}]}>
            With profile details provided by you, The Nnect’s mentoring
            algorithm will suggest a range of the best mentoring matches for you
            based on your qualification, experience, objectives, and goals and
            where you're looking for mentoring.
          </Text>
          <Text style={AppStyles.body14}>
            If you'd like to be more proactive, you can search for mentors and
            mentees by a variety of search filters. Our mentor matching ideas
            take availability, industry, important focal areas, location, and
            keyword relevancy into account. You can request mentors for
            communication through the chatbox, or longer-term mentoring can be
            catered through meeting schedules.
          </Text>
        </Animatable.View>
        <Animatable.View
          animation={'fadeInUp'}
          duration={500}
          delay={450}
          style={styles.section}>
          <Text style={AppStyles.headingH3}>3. Connect and grow further</Text>
          <Image
            source={{uri: 'https://www.thennect.com/working2.png'}}
            style={styles.img}
          />
          <Text style={[AppStyles.body14, {marginVertical: 5}]}>
            Connecting on The Nnect is about establishing a network and
            nurturing long-term, mutually beneficial relationships with the
            people you connect with. After achieving a short-term goal, expand
            your connections, set a primary goal, and network with those who
            share a common passion with you.
          </Text>
        </Animatable.View>
      </View>
    </ScrollView>
  );
};

export default Working;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
  },
  section: {
    marginTop: 5,
    marginBottom: 30,
  },
  img: {
    width: '100%',
    // backgroundColor: '#000',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
