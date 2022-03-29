import React from 'react';
import {AppRegistry} from 'react-native';
import Router from './src/Router';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';
import PushNotification from 'react-native-push-notification';

// import 'react-native-gesture-handler';
// D:\Bootcamp\NativeVerhicleApp\src\Route.js
// import {createStackNavigator} from '@react-navigation/stack';

PushNotification.configure({
  onNotification: notification => {
    console.log('NOTIFICATION', notification);
  },

  onAction: notification => {
    console.log('ACTION', notification.action);
    console.log('NOTIFICATION', notification);
  },
  popInitialNotification: true,

  requestPermissions: false,
});

PushNotification.createChannel(
  {
    channelId: 'rental',
    channelName: 'primary-notification',
  },
  created => console.log(`create channel returned "${created}"`),
);

const AppWithNav = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Router />
      </NavigationContainer>
    </PersistGate>
  </Provider>
);
AppRegistry.registerComponent(appName, () => AppWithNav);
