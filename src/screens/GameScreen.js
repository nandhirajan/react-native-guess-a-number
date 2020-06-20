//@refresh reset
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BodyText from '../components/BodyText';
import Card from '../components/Card';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
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

const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>#{numOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver, onResetGame } = props;
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, pastGuesses]);

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
            <View style ={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess,index) => renderListItem(guess, pastGuesses.length-index))}
                </ScrollView>
            </View>
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
    },
    listItem: {
        borderColor: "black",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent:"space-around",
    },
    list:{
        flex: 1,
        width: "80%"
    }
});

export default GameScreen;