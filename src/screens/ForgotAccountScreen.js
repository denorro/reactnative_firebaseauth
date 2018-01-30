import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CustomButton from '../components/CustomButton';

export default class ForgotAccountScreen extends Component {

    static navigationOptions = {
        title: 'Forgot Username/Password?'
    };

    constructor(){
        super();
        this.state = {
            email: ''
        }
    }

    retrieveLostAccount = () => {
        if(this.state.email){
            Alert.alert("Email is being sent to the email you specified...");
        }
        else{
            Alert.alert("Please provide your email...");
        }        
    };

    emailTextChange = (newText) => {
        this.setState({
            email: newText
        });
    }

    render(){
        return (
            <View style={styles.ForgotAccountContainer}>
                <TextInput keyboardType="email-address" placeholder="Enter E-Mail Address..." value={this.state.email} onChangeText={(newText) => this.emailTextChange(newText)} />
                <CustomButton title={'Submit'} color={'blue'} onPress={this.retrieveLostAccount} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ForgotAccountContainer: {
        flex: 1,
        paddingTop: 15,
        paddingLeft: 3,
        paddingRight: 3
    }
});