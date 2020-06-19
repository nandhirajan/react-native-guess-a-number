//@refresh reset
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Colors from '../constants/colors'

const GameOverScreen = props => {
    const { guessRounds, userNumber, onResetGame } = props;
    return (
        <View style={styles.screen}>
            <Text>Game Over!</Text>
            <Text>Number of rounds {guessRounds}</Text>
            <Text>Number was {userNumber}</Text>
            <Button
                title="Play Again!"
                color={Colors.primary}
                onPress={onResetGame}
                style={styles.restartGame} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    restartGame: {
        marginTop: 20
    }
})

export default GameOverScreen;
