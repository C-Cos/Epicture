import React from 'react';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';

import imgurLogin from '../components/imgurLogin';
import Home from '../components/Home'
import Space from '../components/mySpace'


const SearchStackNavigator= createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            title: 'Home'
        }
    },
    Login: {
        screen: imgurLogin,
        navigationOptions:{
            title: 'Login'
        }
    },
    Space: {
        screen: Space,
        navigationOptions:{
            title: 'My Space'
        }
    }

})

export default createAppContainer(SearchStackNavigator);

