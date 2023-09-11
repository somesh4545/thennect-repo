import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import AppStyles from '../../AppStyles';
import {generateRandomColor} from '../utils/util';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const EducationCard = props => {
  const {item, index, disabled, callbackFun} = props;
  const navigation = useNavigation();
  // console.log(item);
  return (
    <Animatable.View
      animation={'fadeInUp'}
      duration={300}
      delay={200 * index + 100}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.8}
        style={styles.eduCard}
        onPress={() =>
          navigation.navigate('EducationDetail', {
            data: item,
            callbackFun: callbackFun,
          })
        }>
        <View>
          <View
            style={[
              styles.avatar,
              AppStyles.center,
              {backgroundColor: item.bgColor},
            ]}>
            <Text
              style={[
                AppStyles.headingH2,
                {color: '#fff', textTransform: 'uppercase'},
              ]}>
              {item.school.slice(0, 1)}
            </Text>
          </View>
        </View>
        <View>
          <Text style={[AppStyles.headingH5, {fontWeight: 'bold'}]}>
            {item.school}
          </Text>
          <View style={styles.eduTextBlock}>
            <Text style={AppStyles.body16}>{item.degree}, </Text>
            <Text style={AppStyles.body16}>{item.fieldOfStudy}</Text>
          </View>
          <Text style={AppStyles.body14}>
            {item.startYear} - {item.endYear}
          </Text>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );
};

export default EducationCard;

const styles = StyleSheet.create({
  eduCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // flexWrap: 'wrap',
    marginVertical: 10,
    width: width - 20,
  },
  avatar: {
    marginRight: 15,
    // backgroundColor: '#000',
    height: 50,
    width: 50,
    borderRadius: 100,
  },
  eduTextBlock: {
    flexDirection: 'row',
    width: width - 60,
    flexWrap: 'wrap',
    marginVertical: 2,
  },
});
