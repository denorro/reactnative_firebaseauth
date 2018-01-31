import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Button, TextInput, ActivityIndicator, Alert } from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton';

export default class UserAccountScreen extends Component{

    static navigationOptions = ({navigation}) => {
        const headerTitleText = !navigation.state.params.authUser.emailVerified ? 'Verify Account' : 'Hello';
        return {
            title: headerTitleText,
            headerTitleStyle: {
                alignSelf: 'center',
                paddingRight: 10
            },
            headerRight: <Button title={"Logout"} onPress={() => firebase.auth().signOut().then(() => navigation.navigate('Login'))} />
        };        
    };

    constructor(props){
        super(props);
        this.state = {
            email: '',
            displayName: '',
            phoneNumber: '',
            photoUrl: '',
            password: '',
            isSendingEmail: false,
            isUpdatingUser: false,
            emailVerified: props.navigation.state.params.authUser.emailVerified
        };
    }

    resetForm = () => {
        this.setState({
            email: '',
            displayName: '',
            phoneNumber: '',
            photoUrl: '',
            password: ''
        });
    }

    refreshToCheckEmailVerification(){
        firebase.auth().currentUser.reload();
        if(firebase.auth().currentUser.emailVerified){
            this.setState({emailVerified: true}, () => {
                //this.isAccountVerified();
            });
        }
    }

    updateUser = () => {
        const {email,displayName,phoneNumber,photoUrl,password} = this.state;
        if(email === '' && displayName === '' && phoneNumber === '' && photoUrl === '' && password === ''){
            Alert.alert('Update Error', 'Please provide valid values ');
            return;
        }
        let user = firebase.auth().currentUser;
        if(displayName !== '' || displayName !== null){
            user.updateProfile({displayName});
        }
        if(photoUrl !== '' || photoUrl !== null){
            user.updateProfile({photoUrl});
        }
        if(email !== '' || email !== null){
            user.updateEmail(email).then(() => {
                user.sendEmailVerification()
                .catch((error) => {
                    Alert.alert('Email Error', error.message);
                });
            });      
        }
        if(password !== '' || password !== null){
            user.updatePassword(password);
        }        
    }

    sendEmailVerification = () => {
        this.setState({isSendingEmail: true});
        firebase.auth().currentUser.sendEmailVerification().then(() => {                            
            this.setState({isSendingEmail: false});
        })
        .catch((error) => {
            console.log(error);
            this.setState({isSendingEmail: false});
            Alert.alert('Email Error', error.message);
        });  
    }

    isUpdatingUser(){
        if(this.state.isUpdatingUser){
            return <View style={styles.spinnerContainer}>
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.isUpdatingUser} hidesWhenStopped={true} />
                    </View>;
        }
        else{
            return <CustomButton title={"Update User"} color={'#3498db'} onPress={() => this.updateUser()} />;
        }
    }

    isEmailSending(){
        if(this.state.isSendingEmail){
            return (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.isSendingEmail} hidesWhenStopped={true} />
                </View>
            );
        }
        else{
            return (
                <View>
                    <Text>Your account has been created, now it needs to be verified.</Text>
                    <Button title="Verify Account" onPress={() => this.sendEmailVerification()} />
                    <CustomButton title="Refresh Account" onPress={() => this.refreshToCheckEmailVerification()} />
                </View>
            );            
        }
    }

    isAccountVerified = () => {        
        if(!this.state.emailVerified){
            return (
                <View style={{paddingLeft: 3, paddingRight: 3}}>
                   {this.isEmailSending()}
                </View>
            );
        }
        else {
            return (
                <View style={styles.UserAccountFormView}>
                    <Text style={{color: 'red', fontStyle: 'italic'}}>Leave field blank if its value is not changing.</Text>
                    <TextInput placeholder="Display Name..." onChangeText={(newText) => this.setState({displayName: newText})} value={this.state.displayName}  />
                    <TextInput placeholder="Email..." onChangeText={(newText) => this.setState({email: newText})} value={this.state.email} keyboardType="email-address"/>
                    <TextInput placeholder="Password..." onChangeText={(newText) => this.setState({password: newText})} value={this.state.password} secureTextEntry={true} />
                    <TextInput placeholder="Phone Number" onChangeText={(newText) => this.setState({phoneNumber: newText})} value={this.state.phoneNumber}  />
                    <TextInput placeholder="Photo URL..." onChangeText={(newText) => this.setState({photoUrl: newText})} value={this.state.photoUrl}  />
                    {this.isUpdatingUser()}
                    <CustomButton title={"Cancel"} color={'#3498db'} onPress={this.resetForm} />                  
                </View>
            );            
        }
    }

    render(){
        return (
            <View style={styles.UserAccountContainer}>
                {this.isAccountVerified()}               
            </View>
        );
    }
}

const styles = StyleSheet.create({
    UserAccountContainer: {
        flex: 1,
        paddingTop: 15        
    },
    UserAccountFormView: {
        paddingLeft: 3,
        paddingRight: 3
    },
    spinnerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});