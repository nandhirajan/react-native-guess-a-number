//@refresh reset
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import Colors from '../constants/colors';

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const randomNumber = Math.floor((Math.random() * (max - min)) + min);

    if (randomNumber === exclude)
        return generateRandomBetween(min, max, exclude)
    else
        return randomNumber;
}

const GameScreen = props => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < props.userChoice) ||
            (direction === "higher" && currentGuess > props.userChoice)) {
            Alert.alert(
                "Don't lie",
                "You know that this is wrong!",
                [{ text: "Sorry!", style: "cancel" }]
            )
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);;
        setCurrentGuess(nextNumber);
    }

    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess is</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" color={Colors.accent} onPress={() => { nextGuessHandler("lower") }} />
                <Button title="UPPER" color={Colors.primary} onPress={() => { nextGuessHandler("higher") }} />
            </Card>
            <View style={styles.restartGame}>
                <Button title="Restart Game!" color={Colors.primary} onPress={props.restartGameHandler} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        maxWidth: "80%"
    },
    restartGame: {
        marginTop: 20
    }

});

export default GameScreen;