
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InstructionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>How to Play</Text>
      <Text style={styles.text}>
        Take turns adding a sentence to the story. Each player sees only the last few words!
        Try to make the story as ridiculous and unpredictable as possible. No logic allowed!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
  },
});

export default InstructionsScreen;
