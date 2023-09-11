import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useRef} from 'react';

import onboardingData from '../data/onboardingData';
import AppStyles from '../../AppStyles';
import Constants from './../../Constants';

const {width, height} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const [cureentIndex, setCureentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemChanged = useRef(({viewableItems}) => {
    setCureentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 50}).current;

  const handleNext = () => {
    if (cureentIndex < onboardingData.length - 1) {
      slidesRef.current.scrollToIndex({index: cureentIndex + 1});
    } else {
      navigation.replace('GetStarted');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.images}>
          <FlatList
            data={onboardingData}
            renderItem={({item}) => {
              return (
                <View style={styles.onboardingItem}>
                  <Image source={item.image} style={styles.img} />
                  <Text
                    style={[
                      AppStyles.headingH1,
                      {fontSize: 30, marginBottom: 5, textAlign: 'center'},
                    ]}>
                    {item.title}
                  </Text>
                  <Text style={[AppStyles.body16, {textAlign: 'justify'}]}>
                    {item.description}
                  </Text>
                </View>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator
            pagingEnabled
            keyExtractor={item => item.id}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            bounces={false}
            onViewableItemsChanged={viewableItemChanged}
            viewabilityConfig={viewConfig}
            scrollEventThrottle={32}
            ref={slidesRef}
          />
        </View>
        <View style={styles.pagination}>
          {onboardingData.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [10, 25, 10],
              extrapolate: 'clamp',
            });
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                style={[styles.dot, {width: dotWidth, opacity}]}
                key={i.toString()}
              />
            );
          })}
        </View>
      </View>
      <View style={styles.navigationBar}>
        {cureentIndex != onboardingData.length - 1 ? (
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => navigation.replace('GetStarted')}>
            <Text style={AppStyles.body16}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <TouchableOpacity
          style={styles.nextBtn}
          activeOpacity={0.8}
          onPress={() => {
            handleNext();
          }}>
          {cureentIndex != onboardingData.length - 1 ? (
            <Text style={[AppStyles.body16Bold, {color: '#fff'}]}>Next</Text>
          ) : (
            <Text style={[AppStyles.body16Bold, {color: '#fff'}]}>
              Get started
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'space-around',
  },
  images: {
    // flex: 2,
    // height: '50%',
    // height: height / 2,
    // backgroundColor: 'black',
  },
  onboardingItem: {
    width: width,
    padding: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: width,
    height: 250,
    // backgroundColor: '#000',
    resizeMode: 'contain',
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    flexDirection: 'row',
  },
  dot: {
    height: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: Constants.colour.primary,
  },
  navigationBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipBtn: {
    marginLeft: 20,
  },
  nextBtn: {
    backgroundColor: Constants.colour.primary,
    padding: 10,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
