import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppStyles from '../../AppStyles';

const UserProfile = props => {
  var {user, imgDim} = props;
  if (imgDim == null) imgDim = 60;

  return (
    <>
      {user.img_url == null ? (
        <View
          style={[
            styles.userImg,
            AppStyles.center,
            {backgroundColor: user.bgColor, width: imgDim, height: imgDim},
          ]}>
          <Text style={[AppStyles.headingH2, {color: '#fff'}]}>
            {user.firstName.slice(0, 1)}
          </Text>
        </View>
      ) : (
        <Image
          source={{uri: user.img_url}}
          style={[styles.userImg, {width: imgDim, height: imgDim}]}
        />
      )}
    </>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  userImg: {
    borderRadius: 50,
    // borderWidth: 1,
    // borderColor: '#000',
  },
});
