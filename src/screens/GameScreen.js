//@refresh reset
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';


import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import NumberContainer from '../components/NumberContainer';
import Title from '../components/TitleText';
import TitleText from '../components/TitleText';

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
    const [numOfGuess, setNumOfGuess] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver, onResetGame } = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(numOfGuess);
        }
    },[ currentGuess, userChoice, numOfGuess]);

    const nextGuessHandler = (direction) => {
        if ((direction === "lower" && currentGuess < userChoice) ||
            (direction === "higher" && currentGuess > userChoice)) {
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
        setNumOfGuess(numOfGuess => numOfGuess + 1);
    }

    return (
        <View style={styles.screen}>
            <TitleText> Opponent's Guess is</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" color={Colors.accent} onPress={() => { nextGuessHandler("lower") }} />
                <Button title="UPPER" color={Colors.primary} onPress={() => { nextGuessHandler("higher") }} />
            </Card>
            <View style={styles.restartGame}>
                <Button title="Restart Game!" color={Colors.primary} onPress={onResetGame} />
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