import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = props => {
    return(
        <View style ={{...styles.card,...props.style}}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        // shadow property is for iOS
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.26,
        backgroundColor: "white",
        // elevation is for Android
        elevation: 8,
        padding: 20,
        borderRadius: 10
    }
})

export default Card;