import React, { Component } from 'react';
import {View, Text, StyleSheet } from 'react-native';

const Header = (props) => {
    return (
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{props.headerTitle}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#F8F8F8',
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 1,
        elevation: 3,
        marginBottom: 5
    },
    headerText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default Header;