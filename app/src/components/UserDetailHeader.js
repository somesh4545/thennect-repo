import {StyleSheet, Text, View, Animated, Dimensions} from 'react-native';
import React from 'react';

import AppStyles from '../../AppStyles';
import {generateRandomColor} from '../utils/util';
import BackButton from './BackButton';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const UserDetailHeader = props => {
  const header_height_expanded = 60;
  const header_height_narrowed = 70;
  const {data, scrollY} = props;

  const navigation = useNavigation();
  const avatarScale = scrollY.interpolate({
    inputRange: [0, 110],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.header,
        {
          height: scrollY.interpolate({
            inputRange: [-110, 0, 110],
            outputRange: [
              header_height_narrowed,
              header_height_narrowed + header_height_expanded,
              header_height_narrowed,
            ],
            extrapolate: 'clamp',
          }),
          elevation: scrollY.interpolate({
            inputRange: [-110, 0, 110],
            outputRange: [10, 0, 10],
            extrapolate: 'clamp',
          }),
        },
      ]}>
      <View style={{paddingTop: 5}}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      <Animated.View
        style={[
          styles.userInfo,
          {
            top: scrollY.interpolate({
              inputRange: [-110, 0, 110],
              outputRange: [50, 50, 0],
              extrapolate: 'clamp',
            }),
            left: scrollY.interpolate({
              inputRange: [-110, 0, 110],
              outputRange: [30, 30, 40],
              extrapolate: 'clamp',
            }),
          },
        ]}>
        <View style={styles.userImg}>
          {data.img_url == null ? (
            <Animated.View
              style={[
                styles.avatar,
                AppStyles.center,
                {
                  transform: [
                    {
                      scale: avatarScale,
                    },
                  ],
                },
                {backgroundColor: data.bgColor},
              ]}>
              <Text style={[AppStyles.headingH2, {color: '#fff'}]}>
                {data.firstName.slice(0, 1)}
              </Text>
            </Animated.View>
          ) : (
            <Animated.Image
              source={{uri: data.img_url}}
              style={[
                styles.avatar,
                {
                  transform: [
                    {
                      scale: avatarScale,
                    },
                  ],
                },
              ]}
            />
          )}
        </View>
        <Text style={[AppStyles.headingH2, {marginLeft: 15}]}>
          {data.firstName}
        </Text>
      </Animated.View>
    </Animated.View>
  );
};

export default UserDetailHeader;

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#fff',
    width: width,
    padding: 10,
    paddingTop: 15,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    position: 'absolute',
  },
  userImg: {
    // marginRight: 10,s
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
