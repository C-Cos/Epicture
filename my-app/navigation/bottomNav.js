import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Browse from '../components/Browse/Browse';
import imgurLogin from '../components/imgurLogin';
import Home from '../components/Home';
import SearchResult from "../components/Browse/SearchResult";
import UploadImage from "../components/Browse/UploadImage";
import Profile from "../components/Profile/Profile";

const HomeStack = createStackNavigator({
  Home: Home,
  Login : imgurLogin,
});

HomeStack.navigationOptions = {
  title: 'Home',
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const BrowseStack = createStackNavigator({
  Browse: Browse,
  SearchR : SearchResult,
  Upload : UploadImage,
});

BrowseStack.navigationOptions = {
  tabBarLabel: 'Browse',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-images' : 'md-images'}
    />
  ),
};

const ProfileStack = createStackNavigator({
  Profile: Profile,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-person' : 'md-person'}
    />
    

  ),
};

export default createBottomTabNavigator({
  HomeStack,
  BrowseStack,
  ProfileStack
});