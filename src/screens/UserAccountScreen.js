import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableHighlight, Button, TextInput, ActivityIndicator } from 'react-native';
import firebase from 'firebase';
import CustomButton from '../components/CustomButton';

export default class UserAccountScreen extends Component{

    static navigationOptions = ({navigation}) => ({
        title: `Hello ${navigation.state.params.authUser.displayName}`,
        headerTitleStyle: {
            alignSelf: 'center',
            paddingRight: 10
        },
        headerRight: <Button title="Logout" onPress={() => firebase.auth().signOut().then(() => navigation.navigate('Login'))} />
    });

    constructor(props){
        super(props);
        this.state = {
            email: '',
            displayName: '',
            phoneNumber: '',
            photoUrl: '',
            password: ''
        };
    }

    resetForm = () => {
        this.setState({
            email: '',
            displayName: '',
            phoneNumber: '',
            photoUrl: '',
            password
        });
    }

    updateUser = () => {
        
    }

    isLoading = () => {
        if(this.state.loading){
            return <View style={styles.spinnerContainer}>
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} hidesWhenStopped={true} />
                    </View>;
        }
        else{
            return <CustomButton title={"Submit"} color={'#3498db'} onPress={this.updateUser} />;
        }
    }

    render(){
        return (
            <View style={styles.UserAccountContainer}>
                <View style={styles.UserAccountFormView}>
                <TextInput placeholder="Display Name..." onChangeText={(newText) => this.setState({displayName: newText})} value={this.state.displayName}  />
                    <TextInput placeholder="Email..." onChangeText={(newText) => this.setState({email: newText})} value={this.state.email} keyboardType="email-address"/>
                    <TextInput placeholder="Password..." onChangeText={(newText) => this.setState({password: newText})} value={this.state.password} secureTextEntry={true} />
                    <TextInput placeholder="Phone Number" onChangeText={(newText) => this.setState({phoneNumber: newText})} value={this.state.phoneNumber}  />
                    <TextInput placeholder="Photo URL..." onChangeText={(newText) => this.setState({photoUrl: newText})} value={this.state.photoUrl}  />
                    {this.isLoading()}
                    <CustomButton title={"Cancel"} color={'#3498db'} onPress={this.resetForm} />                  
                </View>                
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