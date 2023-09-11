import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import PrimaryButton from './PrimaryButton';
import Lottie from 'lottie-react-native';
import AppStyles from '../../AppStyles';
import {useNavigation} from '@react-navigation/native';

const NoData = props => {
  const {animationSrc, text, btnText, btnOnPress, callbackFun, btnVisible} =
    props;
  const navigation = useNavigation();
  const redirectTo = screen => {
    if (callbackFun) {
      navigation.navigate(screen, {callbackFun});
    } else {
      navigation.navigate(screen);
    }
  };
  return (
    <View style={[styles.centerDiv]}>
      <Lottie
        source={animationSrc}
        autoPlay
        loop
        style={{height: 300, marginBottom: 20}}
      />
      <Text style={AppStyles.headingH5}>{text}</Text>
      {btnVisible == undefined ? (
        <PrimaryButton
          buttonStyle={{
            height: 40,
            marginVertical: 15,
            elevation: 5,
            width: 200,
          }}
          height={40}
          title={btnText}
          onPress={() => redirectTo(btnOnPress)}
        />
      ) : null}
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  centerDiv: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
