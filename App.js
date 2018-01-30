import React, { Component } from 'react';
import {StackNavigator} from 'react-navigation';
import firebase from 'firebase';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotAccountScreen from './src/screens/ForgotAccountScreen';
import UserAccountScreen from './src/screens/UserAccountScreen';

firebase.initializeApp({
  apiKey: "AIzaSyCOYBUJSoNygMCfBiiUzsf63WvTKDv2h04",
  authDomain: "rn-auth-f291b.firebaseapp.com",
  databaseURL: "https://rn-auth-f291b.firebaseio.com",
  projectId: "rn-auth-f291b",
  storageBucket: "rn-auth-f291b.appspot.com",
  messagingSenderId: "507848685903"
});

const App = StackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  ForgotAccount: { screen: ForgotAccountScreen },
  UserAccount: { screen: UserAccountScreen }
});

export default App;




