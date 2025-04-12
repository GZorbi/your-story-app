
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const GameScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { numberOfPlayers, numberOfRounds } = route.params;

  const [story, setStory] = useState('');
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [input, setInput] = useState('');

  const handleNext = () => {
    const updatedStory = story + ' ' + input;
    setInput('');
    if (currentRound >= numberOfRounds) {
      navigation.replace('End', { storyText: updatedStory });
    } else {
      setCurrentRound(currentRound + 1);
      setCurrentPlayer((currentPlayer % numberOfPlayers) + 1);
      setStory(updatedStory);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.round}>Round {currentRound} of {numberOfRounds}</Text>
      <Text style={styles.player}>Player {currentPlayer}</Text>
      <TextInput
        style={styles.input}
        placeholder="Continue the story..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Next" onPress={handleNext} disabled={input.trim() === ''} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  round: {
    fontSize: 20,
    marginBottom: 10,
  },
  player: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default GameScreen;
