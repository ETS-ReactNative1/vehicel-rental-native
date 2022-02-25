import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import App from './screens/App';
import Register from './screens/Register';
import Forgot from './screens/Forgot';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={App} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ForgotPassword" component={Forgot} />
  </Stack.Navigator>
);

export default Router;
