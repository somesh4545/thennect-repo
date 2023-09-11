import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import AppStyles from '../../AppStyles';
import coursesData from '../data/coursesData';
import CourseCard from './../components/CourseCard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const Courses = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={AppStyles.headingH2}>Courses</Text>
        <TouchableOpacity style={styles.searchBox}>
          <FontAwesome name="search" size={18} color={'#000'} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.coursesContainer}>
          {coursesData.map(course => (
            <View key={course.id} style={{marginBottom: 15}}>
              <CourseCard data={course} width={(width - 40) / 2} />
            </View>
          ))}
        </View>
        <View style={{paddingBottom: 70}} />
      </ScrollView>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingTop: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    backgroundColor: '#fff',
  },
  coursesContainer: {
    marginTop: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
