//@refresh reset
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Colors from '../constants/colors';
import DefaultStyles from '../constants/default-styles';
import NumberContainer from '../components/NumberContainer';
import Title from '../components/TitleText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

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
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);
    const [numOfGuess, setNumOfGuess ]= useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver, onResetGame } = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(numOfGuess);
        }
    }, [currentGuess, userChoice, numOfGuess]);

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
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);;
        setCurrentGuess(nextNumber);
        setNumOfGuess(numOfGuess => numOfGuess + 1);
        setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
    }

    return (
        <View style={styles.screen}>
            <TitleText> Opponent's Guess is</TitleText>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    color={Colors.accent}
                    onPress={() => { nextGuessHandler("lower") }}
                >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton
                    color={Colors.primary}
                    onPress={() => { nextGuessHandler("higher") }}
                >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <ScrollView>
                {pastGuesses.map(guess =>
                    <View key={guess}>
                        <Text>
                            {guess}
                        </Text>
                    </View>)}
            </ScrollView>
            <View style={styles.restartGame}>
                <MainButton
                    color={Colors.primary}
                    onPress={onResetGame} >Restart Game</MainButton>
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
        width: 400,
        maxWidth: "90%"
    },
    restartGame: {
        marginTop: 20
    }

});

export default GameScreen;