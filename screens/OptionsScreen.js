
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OptionsScreen = () => {
  const navigation = useNavigation();

  const startGame = () => {
    navigation.replace('Game', {
      numberOfPlayers: 2,
      numberOfRounds: 10,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>
      <Button title="Start Game" onPress={startGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default OptionsScreen;
