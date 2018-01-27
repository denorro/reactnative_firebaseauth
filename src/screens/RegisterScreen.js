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
            phone: '',
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
            phone: '',
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            confirmPassword: ''
        });
    }

    navigateTo = (screen) => {
        this.props.navigation.navigate(screen);
    }

    render(){
        return (
            <View style={styles.RegisterContainer}>
                <View style={styles.RegisterFormView}>
                    <TextInput placeholder="Email..." onChangeText={(newText) => this.setState({email: newText})} value={this.state.email} keyboardType="email-address"/>
                    <TextInput placeholder="Phone..." onChangeText={(newText) => this.setState({phone: newText})} value={this.state.phone} keyboardType="phone-pad"/>
                    <TextInput placeholder="First Name..." onChangeText={(newText) => this.setState({firstName: newText})} value={this.state.firstName} />
                    <TextInput placeholder="Last Name..." onChangeText={(newText) => this.setState({lastName: newText})} value={this.state.lastName} />
                    <TextInput placeholder="Username..." onChangeText={(newText) => this.setState({username: newText})} value={this.state.username} />
                    <TextInput placeholder="Password..." onChangeText={(newText) => this.setState({password: newText})} value={this.state.password} secureTextEntry={true} />
                    <TextInput placeholder="Confirm Password..." onChangeText={(newText) => this.setState({confirmPassword: newText})} value={this.state.confirmPassword} secureTextEntry={true} />
                    <CustomButton title={"Submit"} color={'#3498db'} onPress={this.submitForm} />
                    <CustomButton title={"Cancel"} color={'#3498db'} onPress={this.resetForm} />
                    <View style={styles.LinksView}>
                        <TouchableHighlight style={styles.LinkTouchHighlights} onPress={() => this.navigateTo('Login')}>
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
    LinkTouchHighlights: {
        margin: 5
    }
});