import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import NavBar from './bottomNav';

export default createAppContainer(createSwitchNavigator({
    Main: NavBar,
  }));