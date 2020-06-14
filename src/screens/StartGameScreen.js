//@refresh reset
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState("");

    const onChangeInputHandler = inputText => {
        setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
    }

    return (
        <TouchableWithoutFeedback onPress = {()=>{ Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <Text style={styles.title}>
                    Start a new game!
            </Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={onChangeInputHandler}
                        value={enteredNumber}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Reset" color={Colors.accent} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Submit" color={Colors.primary} />
                        </View>
                    </View>
                </Card>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: "80%",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15
    },
    button: {
        width: 100
    },
    input: {
        width: 50,
        textAlign: "center"
    }
});

export default StartGameScreen;