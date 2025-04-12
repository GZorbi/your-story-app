
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EndScreen = ({ route, navigation }) => {
  const { storyText } = route.params;

  useEffect(() => {
    const saveStory = async () => {
      try {
        const existing = await AsyncStorage.getItem('storyHistory');
        const stories = existing ? JSON.parse(existing) : [];
        stories.unshift(storyText);
        await AsyncStorage.setItem('storyHistory', JSON.stringify(stories));
      } catch (error) {
        console.error('Error saving story:', error);
      }
    };

    if (storyText) {
      saveStory();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Story</Text>
      <Text style={styles.story}>{storyText}</Text>
      <Button title="Play Again" onPress={() => navigation.replace('Options')} />
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
    textAlign: 'center',
  },
  story: {
    fontSize: 16,
    marginBottom: 30,
  },
});

export default EndScreen;
