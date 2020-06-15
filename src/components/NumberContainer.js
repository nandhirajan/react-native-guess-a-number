//@refresh reset
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';

const NumberContainer = props => {
    return (
        <Card style ={styles.container}>
            <Text style = {styles.number}>
                {props.children}
            </Text>
        </Card>)
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent,
        padding : 10,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"

    },
    number:{
        color: Colors.accent,
        fontSize: 22
    }
})

export default NumberContainer;