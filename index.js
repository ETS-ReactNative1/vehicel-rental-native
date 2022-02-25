import React from 'react';
import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
// import 'react-native-gesture-handler';
// D:\Bootcamp\NativeVerhicleApp\src\Route.js
// import {createStackNavigator} from '@react-navigation/stack';

const AppWithNav = () => (
  <NavigationContainer>
    <Router />
  </NavigationContainer>
);
AppRegistry.registerComponent(appName, () => AppWithNav);
