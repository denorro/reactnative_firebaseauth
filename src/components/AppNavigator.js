import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotAccount from './src/screens/ForgotAccount';

const AppNavigator = StackNavigator(
{
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  ForgotAccount: { screen: ForgotAccount }
});

export default AppNavigator;