import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableHighlight} from 'react-native';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';

export default class RegisterScreen extends Component {

    static navigationOptions = {
        title: 'Registration',
        headerTitleStyle: {
            alignSelf: 'center'
        }
    }   

    constructor(props){
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    submitForm = () => {
        console.log('register form submitted');
    }

    resetForm = () => {
        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: ''
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

    navigateToLogin = () => {
        this.props.navigation.navigate('Login');
    }

    render(){
        return (
            <View style={styles.RegisterContainer}>
                <View style={styles.RegisterFormView}>
                    <TextInput placeholder="Email..." onChangeText={this.usernameTextChange} value={this.state.email} />
                    <TextInput placeholder="First Name..." onChangeText={this.passwordTextChange} value={this.state.firstName} />
                    <TextInput placeholder="Last Name..." onChangeText={this.passwordTextChange} value={this.state.firstName} />
                    <TextInput placeholder="Username..." onChangeText={this.usernameTextChange} value={this.state.username} />
                    <TextInput placeholder="Password..." onChangeText={this.passwordTextChange} value={this.state.password} secureTextEntry={true} />
                    <TextInput placeholder="Confirm Password..." onChangeText={this.passwordTextChange} value={this.state.password} secureTextEntry={true} />
                    <CustomButton title={"Submit"} color={'#3498db'} buttonPress={this.submitForm} />
                    <CustomButton title={"Cancel"} color={'#3498db'} buttonPress={this.resetForm} />
                    <View style={styles.LinksView}>
                    <TouchableHighlight style={styles.LinkHighlights} onPress={this.navigateToLogin}>
                        <Text>Already have an account? Login</Text>
                    </TouchableHighlight>
                    </View>
                    
                </View>                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    RegisterContainer: {
        flex: 1,
        paddingTop: 15
    },
    RegisterFormView: {
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