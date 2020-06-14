import React from 'react';
import { View, Text, TextInput, Button, StyleSheet}  from 'react-native';

const StartGameScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.title}>
                Start a new game!
            </Text>
            <View style ={styles.inputContainer}>
                <Text >Select a Number</Text>
                <TextInput />
                <View style = {styles.buttonContainer}>
                    <Button title="Reset" />
                    <Button title="Submit" />
                </View>

            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer:{
        width: 300,
        maxWidth: "80%",
        alignItems: "center",
        // shadow property is for iOS
        shadowColor: "black", 
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity : 0.26,
        backgroundColor: "white",
        // elevation is for Android
        elevation: 8,
        padding : 20,
        borderRadius: 10
    },
    buttonContainer:{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    }
});

export default StartGameScreen;