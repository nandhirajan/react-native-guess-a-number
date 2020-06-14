//@refresh reset
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';

const StartGameScreen = props => {
    const [enteredNumber, setEnteredNumber] = useState("");
    const [confirmedNumber, setConfirmedNumber] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const onChangeInputHandler = inputText => {
        setEnteredNumber(inputText.replace(/[^0-9]/g, ""));
    }

    const resetInputHandler = () => {
        setEnteredNumber("");
        setConfirmed(false);
    }

    const submitInputHandler = () => {
        setConfirmed(true);
        setEnteredNumber("");
        setConfirmedNumber(parseInt(enteredNumber));
    }

    
    let confirmedOutput = "";
    if (confirmed) {
        confirmedOutput = <Text> Choosen number is {confirmedNumber}</Text>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
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
                            <Button title="Reset" color={Colors.accent} onPress={resetInputHandler} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Submit" color={Colors.primary} onPress={submitInputHandler} />
                        </View>
                    </View>
                </Card>
                {confirmed && <Text> Choosen number is {confirmedNumber}</Text>}
                {/* {confirmedOutput} */}
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