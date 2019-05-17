import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation';

import Album from "./Album";
import Post from "./Post";
import Favorite from "./Favorite";

const HomeTab = createMaterialTopTabNavigator({
    Post: Post,
    Favorite: Favorite,
    Album: Album,
  }, {
    tabBarOptions: {
      scrollEnabled: false,
      labelStyle: {
        fontSize: 12,
        color: '#010405'

      },
      style: {
        backgroundColor: '#09BDC5',
        opacity: 0.2
      },
      indicatorStyle: {
        backgroundColor: '#fff'
      }
    },
  });

  export default HomeTab