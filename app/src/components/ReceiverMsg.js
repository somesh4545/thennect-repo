import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AppStyles from '../../AppStyles';

import Moment from 'react-moment';

const ReceiverMsg = props => {
  return (
    <View style={styles.receiverMsgContainer}>
      <View style={styles.receiverMsg}>
        <Text style={[AppStyles.body16, {color: '#000'}]}>{props.msg}</Text>
        <Text style={[AppStyles.body12, {paddingLeft: 10, marginLeft: 'auto'}]}>
          <Moment element={Text} format="LT">
            {props.time}
          </Moment>
        </Text>
      </View>
    </View>
  );
};

export default ReceiverMsg;

const styles = StyleSheet.create({
  receiverMsgContainer: {
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  receiverMsg: {
    padding: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    maxWidth: '80%',
    backgroundColor: '#E5E5E5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
  },
});
