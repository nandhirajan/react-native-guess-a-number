//@refresh reset
import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';

import Colors from '../constants/colors'
import DefaultStyles from '../constants/default-styles';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import SuccessImage from '../../assets/images/success.png'

const GameOverScreen = props => {
    const { guessRounds, userNumber, onResetGame } = props;
    return (
        <View style={styles.screen}>
            <TitleText>Game Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    fadeDuration={1000}
                    // source={SuccessImage} // To load image locally
                    source={{ uri: "https://cdn.pixabay.com/photo/2019/01/22/18/30/summit-3948706_960_720.jpg" }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.resultContainer}>
                <BodyText style ={styles.resultText}>
                    Your phone needed <Text style={styles.highlightedText}>{guessRounds}</Text>
                    rounds to guess the number <Text style={styles.highlightedText}>{userNumber}</Text>
                </BodyText>
            </View>
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
    },
    image: {
        width: "100%",
        height: "100%",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden"
    },
    highlightedText: {
        color: Colors.primary,
        fontFamily: "open-sans-bold"
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: 15
    },
    resultText:{
        textAlign: "center"
    }
})

export default GameOverScreen;
