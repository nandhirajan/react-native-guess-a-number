//@refresh reset
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText' ;

const GameOverScreen = props => {
    const { guessRounds, userNumber, onResetGame } = props;
    return (
        <View style={styles.screen}>
            <BodyText>Game Over!</BodyText>
            <BodyText>Number of rounds {guessRounds}</BodyText>
            <BodyText>Number was {userNumber}</BodyText>
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
