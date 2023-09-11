import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

// import dynamicLinks from '@react-native-firebase/dynamic-links';

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createStackNavigator} from '@react-navigation/stack';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Splash from './src/screens/Splash';
import GetStarted from './src/screens/GetStarted';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import ForgotPassword from './src/screens/ForgotPassword';
import Home from './src/screens/Home';
import Chats from './src/screens/Chats';
import Courses from './src/screens/Courses';
import Blogs from './src/screens/Blogs';
import Profile from './src/screens/Profile';
import Constants from './Constants';
import Onboarding from './src/screens/Onboarding';
import ChatDetail from './src/screens/ChatDetail';
import BlogDetail from './src/screens/BlogDetail';
import Education from './src/screens/Education';
import AddEducation from './src/screens/AddEducation';
import EducationDetail from './src/screens/EducationDetail';
import MentorsSuggestion from './src/screens/MentorsSuggestion';
import UserDetail from './src/screens/UserDetail';
import SearchResult from './src/screens/SearchResult';
import GenralInfo from './src/screens/GenralInfo';
import EditProfile from './src/screens/EditProfile';
import InProgress from './src/screens/InProgress';
import ProfessionForm from './src/screens/ProfessionForm';
import CurrentWork from './src/screens/CurrentWork';
import Toast from 'react-native-toast-message';
import {SocketContext, socket} from './src/lib/socket';
import QNA from './src/screens/QNA';
import QnADetail from './src/screens/QnADetail';
import AddQNA from './src/screens/AddQNA';
import Working from './src/screens/Working';
import ContactUs from './src/screens/ContactUs';
import Profession from './src/screens/Profession';

const Tabs = AnimatedTabBarNavigator();
const BottomTab = () => {
  return (
    <Tabs.Navigator
      // default configuration from React Navigation
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#222222',
        activeBackgroundColor: '#7561FF',
      }}
      appearance={{
        floating: true,
        tabBarBackground: Constants.colour.primary,
        whenActiveShow: 'both',
        horizontalPadding: 10,
      }}>
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="home"
              size={size ? size : 24}
              color={focused ? color : '#9A9A9A'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome
              name="send"
              size={size ? size : 24}
              color={focused ? color : '#9A9A9A'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Courses"
        component={Courses}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="graduation-cap"
              size={size ? size : 24}
              color={focused ? color : '#9A9A9A'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Blogs"
        component={Blogs}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="scroll"
              size={size ? size : 24}
              color={focused ? color : '#9A9A9A'}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Icon
              name="user"
              size={size ? size : 24}
              color={focused ? color : '#9A9A9A'}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

const Stack = createNativeStackNavigator();

const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {animation: 'timing', config: {duration: 500}},
    close: {animation: 'timing', config: {duration: 500}},
  },
  cardStyleInterpolator: ({current: {progress}}) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};

const App = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <SocketContext.Provider value={socket}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: 'app_' + currentRouteName,
              screen_class: 'app_' + currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="GetStarted"
            component={GetStarted}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{headerShown: false, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Main"
            component={BottomTab}
            options={{headerShown: false, animation: 'fade_from_bottom'}}
          />
          <Stack.Screen
            name="ChatDetail"
            component={ChatDetail}
            options={{headerShown: false, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="BlogDetail"
            component={BlogDetail}
            options={{headerShown: true, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="Education"
            component={Education}
            options={{headerShown: true, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="AddEducation"
            component={AddEducation}
            options={{headerShown: true, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="EducationDetail"
            component={EducationDetail}
            options={{headerShown: true, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="MentorsSuggestion"
            component={MentorsSuggestion}
            options={{headerShown: true}}
          />
          <Stack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{headerShown: false, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="SearchResult"
            component={SearchResult}
            options={{headerShown: true, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="GenralInfo"
            component={GenralInfo}
            options={{headerShown: true, animation: 'slide_from_right'}}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="InProgress"
            component={InProgress}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="ProfessionForm"
            component={ProfessionForm}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Profession"
            component={Profession}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="CurrentWork"
            component={CurrentWork}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="QNA"
            component={QNA}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="QnADetail"
            component={QnADetail}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="AddQNA"
            component={AddQNA}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          <Stack.Screen
            name="Working"
            component={Working}
            options={{
              headerShown: true,
              animation: 'slide_from_right',
            }}
          />
          {/* <Stack.Screen
            name="ContactUs"
            component={ContactUs}
            options={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </SocketContext.Provider>
  );
};

export default App;
