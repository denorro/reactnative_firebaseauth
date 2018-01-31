import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import CustomButton from '../components/CustomButton';
import firebase from 'firebase';

export default class ForgotAccountScreen extends Component {

    static navigationOptions = {
        title: 'Forgot Username/Password?'
    };

    constructor(){
        super();
        this.state = {
            email: '',
            loading: false           
        };
    }

    retrieveLostAccount = () => {
        const {email} = this.state;
        if(email !== '' && email !== null){
            this.setState({loading:true});
            firebase.auth().sendPasswordResetEmail(email)
                    .then((result) => {
                        this.setState({loading:false, email: ''});
                        Alert.alert('Success', `Email sent to ${email}`);
                    })
                    .catch((error) => {
                        this.setState({loading:false});
                        console.log(error);
                    });
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

    isLoading(){
        if(this.state.loading){
            return (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} />
                </View>
            );
        }
        else {
            return (
                <View>
                    <TextInput keyboardType="email-address" placeholder="Enter E-Mail Address..." value={this.state.email} onChangeText={(newText) => this.emailTextChange(newText)} />
                    <CustomButton title={'Submit'} color={'blue'} onPress={this.retrieveLostAccount} />
                </View>
            );
            
        }
    }

    render(){
        return (
            <View style={styles.ForgotAccountContainer}>
                {this.isLoading()}
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
    },
    spinnerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});