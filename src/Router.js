/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './screens/Login';
import Register from './screens/Register';
import Forgot from './screens/Forgot';
import Home from './screens/home/Home';
import Add from './screens/Add';
import Chat from './screens/Chat';
import Search from './screens/Search';
import History from './screens/History';
import Detail from './screens/Detail';
import Payment from './screens/payment/Payment';
import GetPayment from './screens/payment/GetPayment';
import FinishPayment from './screens/payment/FinishPayment';
import Success from './screens/payment/Success';
import Profile from './screens/profile/Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const NavBottom = () => (
  <Tab.Navigator
    initialRouteName="Home"
    // component={Home}
    screenOptions={{headerShown: false, tabBarShowLabel: false}}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/home.png')}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/history.png')}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
    />
    <Tab.Screen
      name="Chat"
      component={Chat}
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/chat.png')}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Image
              source={require('./assets/profile.png')}
              resizeMode="cover"
              style={{
                width: 25,
                height: 25,
                tintColor: focused && '#ffcd61',
              }}
            />
          </View>
        ),
        tabBarActiveBackgroundColor: '#f5f5f5',
      }}
      
    />
  </Tab.Navigator>
);

const Router = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={Forgot} />
    {/* <Stack.Screen name="HomeAdmin" component={HomeAdmin} /> */}
    <Stack.Screen name="Add" component={Add} />
    <Stack.Screen name="NavBottom" component={NavBottom} />
    <Stack.Screen name="Detail" component={Detail} />
    <Stack.Screen name="Payment" component={Payment} />
    <Stack.Screen name="GetPayment" component={GetPayment} />
    <Stack.Screen name="FinishPayment" component={FinishPayment} />
    <Stack.Screen name="Success" component={Success} />
  </Stack.Navigator>
);

export default Router;
