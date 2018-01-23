import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableHighlight} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

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
            username: '',
            password: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }    

    submitForm = () => {
        console.log('form submitted');
    }

    resetForm = () => {
        this.setState({
           username: '',
           password: '' 
        });
    }

    usernameTextChange = (newText) => {
        this.setState({
            username: newText
        });
    }

    passwordTextChange = (newText) => {
        this.setState({
            password: newText
        });
    }

    navigateToRegister = () => {
        this.props.navigation.navigate('Register')
    }

    navigateToForgotAccount = () => {
        console.log("Navigating to Forgot Page!")
    }

    render(){
        return (
            <View style={styles.LoginContainer}>
                <View style={styles.LoginFormView}>
                    <TextInput placeholder="Username..." onChangeText={this.usernameTextChange} value={this.state.username} />
                    <TextInput placeholder="Password..." onChangeText={this.passwordTextChange} value={this.state.password} secureTextEntry={true} />
                    <CustomButton title={"Submit"} color={'#3498db'} buttonPress={this.submitForm} />
                    <CustomButton title={"Cancel"} color={'#3498db'} buttonPress={this.resetForm} />
                    <View style={styles.LinksView}>
                        <TouchableHighlight style={styles.LinkHighlights} onPress={this.navigateToForgotAccount}>
                            <Text>Forgot Username/Password?</Text>
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
    }
});