import React from 'react';
import { Platform } from 'react-native';
import { createMaterialTopTabNavigator} from 'react-navigation';

import Settings from "./Settings"
import Post from "./Post";
import Favorite from "./Favorite";

const HomeTab = createMaterialTopTabNavigator({
    Post: Post,
    Favorite: Favorite,
    Settings: Settings,
  }, {
    tabBarOptions: {
      scrollEnabled: false,
      labelStyle: {
        fontSize: 12,
        color: '#010405'

      },
      style: {
        backgroundColor: '#007BFF',
      },
      indicatorStyle: {
        backgroundColor: '#fff'
      }
    },
  });

  export default HomeTab