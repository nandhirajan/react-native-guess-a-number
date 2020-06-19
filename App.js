import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './src/components/Header';
import StartGameScreen from './src/screens/StartGameScreen'
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require("./assets/fonts/OpenSans-Regular.ttf"),
    'open-sans-bold': require("./assets/fonts/OpenSans-Bold.ttf")
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState(0);
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setDataLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  }

  const restartGameHandler = () => {
    setUserNumber(0);
    setGuessRounds(0);
  }

  const gameOverHandler = (numOfGuess) => {
    setGuessRounds(numOfGuess);
  }

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen
      userChoice={userNumber}
      onGameOver={gameOverHandler}
      onResetGame={restartGameHandler}
    />
  } else if (guessRounds > 0) {
    content = <GameOverScreen
      guessRounds={guessRounds}
      userNumber={userNumber}
      onResetGame={restartGameHandler} />
  }

  return (
    <View style={styles.container}>
      <Header title="Guess A Number?" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});