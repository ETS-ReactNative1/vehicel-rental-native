import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from './screens/Login';
import Register from './screens/Register';
import Forgot from './screens/Forgot';
import Home from './screens/Home';
import Add from './screens/Add';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={Forgot} />
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Add" component={Add} />
  </Stack.Navigator>
);

export default Router;
