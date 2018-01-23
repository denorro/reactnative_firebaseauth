import React, {Component} from 'react';
import {StyleSheet, Button, View} from 'react-native';

const CustomButton = (props) => {

    

    return (
        <View style={styles.ButtonContainer}>
            <Button title={props.title} color={props.color} onPress={props.buttonPress}/>
        </View>
        
    );
    
};

const styles = StyleSheet.create({
    ButtonContainer: {
        marginTop: 5,
        marginBottom: 5,
        padding: 0
    }
});

export default CustomButton;