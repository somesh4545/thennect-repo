import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AppStyles from '../../AppStyles';
import Constants from './../../Constants';
import {useNavigation} from '@react-navigation/native';

const TopBar = props => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        elevation: 10,
        padding: 20,
        backgroundColor: '#fff',
      }}>
      <Text style={[AppStyles.headingH5]}>{props.title}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search');
        }}>
        <FontAwesome5
          name="search"
          size={20}
          color={Constants.colour.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;

const styles = StyleSheet.create({});
