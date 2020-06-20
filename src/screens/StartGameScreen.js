//@refresh reset
import React, { useState } from 'react';
import { View, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

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
        const inputNumber = parseInt(enteredNumber)

        if (isNaN(inputNumber) || inputNumber <= 0 || inputNumber > 99) {
            Alert.alert(
                "Invalid number",
                "Number must be between 1 and 99",
                [{ text: "Okay", style: "destructive" }]);
            setEnteredNumber("");
            return;
        }
        setConfirmed(true);
        setEnteredNumber("");
        setConfirmedNumber(inputNumber);
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <BodyText> You selected: </BodyText>
                <View>
                    <NumberContainer>{confirmedNumber}</NumberContainer>
                    <MainButton
                        onPress={() => { props.onStartGame(confirmedNumber) }}
                    >
                        START GAME
                    </MainButton>
                </View>
            </Card>
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
            <View style={styles.screen}>
                <TitleText>
                    Start a new game!
                </TitleText>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
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
                {confirmedOutput}
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
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center"  // TODO - not formatting the Number Container as stretch
    }
});

export default StartGameScreen;