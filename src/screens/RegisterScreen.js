import React, {Component} from 'react';
import {Text, TextInput, StyleSheet, Button, View, TouchableHighlight, Alert, ActivityIndicator} from 'react-native';
import firebase from 'firebase';
import Header from '../components/Header';
import CustomButton from '../components/CustomButton';
import User from '../models/User';

export default class RegisterScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `Registration`,
        headerTitleStyle: {
            alignSelf: 'center'
        }
    });    

    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            loading: false
        };
        this.registerUser = this.registerUser.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    registerUser = () => {
        const {email,password,confirmPassword} = this.state;
        if(email === '' || password === '' || confirmPassword === ''){
            Alert.alert('Please provide e-mail and password. All fields required.');
        }
        else if(password !== confirmPassword){
            Alert.alert('Password do not match!');
            this.setState({password:'', confirmPassword:''});
        }
        else {
            this.setState({loading: true});
            firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then((user) => {
                        console.log(user);
                        this.resetForm();
                        this.props.navigation.navigate('UserAccount', {authUser: user});                                                         
                    })
                    .catch((error) => {
                        Alert.alert('Error', error.message);
                        this.resetForm();
                    });
        }
    }

    resetForm = () => {
        this.setState({
            email: '',
            password: '',
            confirmPassword: '',
            loading: false
        });
    }

    isLoading = () => {
        if(this.state.loading){
            return <View style={styles.spinnerContainer}>
                        <ActivityIndicator size="large" color="#0000ff" animating={this.state.loading} hidesWhenStopped={true} />
                    </View>;
        }
        else{
            return <CustomButton title={"Submit"} color={'#3498db'} onPress={this.registerUser} />;
        }
    }

    render(){
        return (
            <View style={styles.RegisterContainer}>
                <View style={styles.RegisterFormView}>
                    <TextInput placeholder="Email..." onChangeText={(newText) => this.setState({email: newText})} value={this.state.email} keyboardType="email-address"/>
                    <TextInput placeholder="Password..." onChangeText={(newText) => this.setState({password: newText})} value={this.state.password} secureTextEntry={true} />
                    <TextInput placeholder="Confirm Password..." onChangeText={(newText) => this.setState({confirmPassword: newText})} value={this.state.confirmPassword} secureTextEntry={true} />
                    {this.isLoading()}
                    <CustomButton title={"Cancel"} color={'#3498db'} onPress={this.resetForm} />
                    <View style={styles.LinksView}>
                        <TouchableHighlight style={styles.LinkTouchHighlights} onPress={() => this.props.navigation.navigate('Login')}>
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
    },
    spinnerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    }
});