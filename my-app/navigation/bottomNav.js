import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import Space from '../components/mySpace';
import imgurLogin from '../components/imgurLogin';
import Home from '../components/Home';
import SearchResult from "../components/SearchResult";
import UploadImage from "../components/UploadImage";

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
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SpaceStack = createStackNavigator({
  Space: Space,
  SearchR : SearchResult,
  Upload : UploadImage
});

SpaceStack.navigationOptions = {
  tabBarLabel: 'MySpace',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

/* const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}; */

export default createBottomTabNavigator({
  HomeStack,
  SpaceStack,
});