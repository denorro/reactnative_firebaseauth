import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableHighlight, Switch, Alert, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import User from '../models/User';


export default class LoginScreen extends Component {

    static navigationOptions = {
        title: 'Login',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    }    

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            remember: false,
            loading: false
        };
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    submitForm = () => {
        const {email,password} = this.state;
        if(email === '' || password === ''){
            Alert.alert('Please provide E-Mail and Password!');
        }
        else{
            this.setState({loading: true});
            firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((user) => {
                        console.log('User: ', user);
                        this.setState({loading: false});
                        this.resetForm();
                        let authenticatedUser = new User(user.uid, user.email, user.emailVerified, user.phoneNumber, user.photoUrl, user.displayName);
                        console.log('Auth User: ', authenticatedUser);
                        this.props.navigation.navigate('UserAccount', {authUser: authenticatedUser });
                    })
                    .catch((error) => {
                        this.setState({loading: false});
                        console.log(error);
                        Alert.alert('Error', error.message);
                        this.resetForm();
                    });             
        }     
    }

    resetForm = () => {
        this.setState({
           email: '',
           password: '',
           remember: false
        });
    }

    emailTextChange = (newText) => {
        this.setState({
            email: newText
        });
    }

    passwordTextChange = (newText) => {
        this.setState({
            password: newText
        });
    }

    navigateToRegister = () => {
        this.props.navigation.navigate('Register');
    }

    navigateToForgotAccount = () => {
        this.props.navigation.navigate('ForgotAccount');
    }

    toggleRememberMe = () => {
        this.setState({
            remember: !this.state.remember
        });
    }

    isLoading(){
        if(this.state.loading){
            return (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} hidesWhenStopped={true} />
                </View>
            );
        }
        else{
            return (
                <CustomButton title={"Submit"} color={'#3498db'} onPress={this.submitForm} />
            );
        }
    }

    render(){
        return (
            <View style={styles.LoginContainer}>
                <View style={styles.LoginFormView}>
                    <TextInput placeholder="E-Mail..." onChangeText={this.emailTextChange} value={this.state.email} />
                    <TextInput placeholder="Password..." onChangeText={this.passwordTextChange} value={this.state.password} secureTextEntry={true} />
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Switch value={this.state.remember} onValueChange={this.toggleRememberMe} /><Text>Remember Me?</Text>
                    </View>                    
                    {this.isLoading()}
                    <CustomButton title={"Cancel"} color={'#3498db'} onPress={this.resetForm} />
                    <View style={styles.LinksView}>
                        <TouchableHighlight style={styles.LinkHighlights} onPress={this.navigateToForgotAccount}>
                            <Text>Forgot Password?</Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={styles.LinkHighlights} onPress={this.navigateToRegister}>
                            <Text>Register</Text>
                        </TouchableHighlight>                        
                    </View>                    
                </View>  
            </View>
        );
    }
}

const styles = StyleSheet.create({
    LoginContainer: {
        flex: 1,
        paddingTop: 15
    },
    LoginFormView: {
        paddingLeft: 3,
        paddingRight: 3
    },
    LinksView:{
        alignItems: 'center'
    },
    LinkHighlights: {
        margin: 5
    },
    spinnerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});