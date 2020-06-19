//@refresh reset
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles';

const GameOverScreen = props => {
    const { guessRounds, userNumber, onResetGame } = props;
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>Game Over!</Text>
            <Text style={DefaultStyles.bodyText}>Number of rounds {guessRounds}</Text>
            <Text style={DefaultStyles.bodyText}>Number was {userNumber}</Text>
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
