import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../AppStyles';
import Moment from 'react-moment';

const SenderMsg = props => {
  return (
    <View style={styles.senderMsgContainer}>
      <LinearGradient
        colors={['#4834D4', '#BE2EDD']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.senderMsg}>
        <Text style={[AppStyles.body16, {color: '#fff'}]}>{props.msg}</Text>
        <Text
          style={[
            AppStyles.body12,
            {
              color: '#fff',
              marginLeft: 'auto',
              paddingLeft: 10,
            },
          ]}>
          <Moment element={Text} format="LT">
            {props.time}
          </Moment>
        </Text>
      </LinearGradient>
    </View>
  );
};

export default SenderMsg;

const styles = StyleSheet.create({
  senderMsgContainer: {
    alignItems: 'flex-end',
    marginBottom: 5,
  },
  senderMsg: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderTopRightRadius: 0,
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
});
