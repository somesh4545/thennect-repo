import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppStyles from '../../AppStyles';

const DataLoading = () => {
  return (
    <View style={[styles.container, AppStyles.center]}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default DataLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});
