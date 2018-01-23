import React, { Component } from 'react';

import {StackNavigator} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const App = StackNavigator({
  Login: { screen: LoginScreen },
  Register: {screen: RegisterScreen}
});

export default App;




