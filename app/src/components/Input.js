import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from 'react-native';

import Close from 'react-native-vector-icons/AntDesign';
import Eye from 'react-native-vector-icons/Ionicons';

// import Colors from '../../styles/Colors';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

Close.loadFont();
Eye.loadFont();

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const InputLeftIcon = {
  user: require('../assets/images/auth/user.png'),
  email: require('../assets/images/auth/email.png'),
  mobile: require('../assets/images/auth/mobile.png'),
  password: require('../assets/images/auth/password.png'),
  confirmPassword: require('../assets/images/auth/confirmPassword.png'),
  linkdin: require('../assets/images/auth/linkdin.png'),
  dribble: require('../assets/images/auth/dribble.png'),
  instagram: require('../assets/images/auth/instagram.png'),
  twitter: require('../assets/images/auth/twitter.png'),
};

const Input = props => {
  const {
    value,
    placeholder,
    iconName,
    iconType,
    type,
    secureTextEntry,
    secureTextEntryConfirm,
    onPress,
    onChangeText,
    editable,
    keyboardType,
  } = props;

  const IconColor = '#000';
  const LeftIcon = InputLeftIcon[iconName];

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={100}>
      <View style={styles.container}>
        <View style={styles.row}>
          {iconType == null ? (
            LeftIcon && <Image source={LeftIcon} style={styles.image} />
          ) : (
            <FontAwesome5
              style={{marginRight: 10}}
              name={iconType}
              size={24}
              color={'#ddd'}
            />
          )}

          <TextInput
            keyboardType={keyboardType ?? 'default'}
            editable={editable != null ? editable : true}
            style={[
              {
                flex: 1,
                color: '#000',
                borderBottomWidth: 1,
                padding: 0,
                borderBottomColor: '#ddd',
                fontFamily: 'DMSans-Regular',
                fontSize: 15,
              },
            ]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={'#ddd'}
            secureTextEntry={
              type === 'password' ? secureTextEntry : secureTextEntryConfirm
            }
          />
          <View style={styles.row}>
            <TouchableOpacity onPress={onPress}>
              {type === 'normal' ? null : (
                <>
                  {type === 'password' ? (
                    <>
                      {secureTextEntry ? (
                        <Eye
                          name="eye-off-outline"
                          size={22}
                          color={IconColor}
                        />
                      ) : (
                        <Eye name="eye-outline" size={22} color={IconColor} />
                      )}
                    </>
                  ) : (
                    <>
                      {secureTextEntryConfirm ? (
                        <Eye
                          name="eye-off-outline"
                          size={22}
                          color={IconColor}
                        />
                      ) : (
                        <Eye name="eye-outline" size={22} color={IconColor} />
                      )}
                    </>
                  )}
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    // marginLeft: 10,
    // marginRight: 10,
  },
  image: {
    height: 24,
    width: 24,
    marginRight: 10,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  separator: {
    height: 30,
    width: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#ddd',
  },
});

export default Input;
