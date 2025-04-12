
import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainMenuScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/menu_logo_clean.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Main Menu</Text>
      <View style={styles.buttonContainer}>
        <Button title="Start Game" onPress={() => navigation.navigate('Options')} />
        <Button title="How to Play" onPress={() => navigation.navigate('Instructions')} />
        <Button title="View Story History" onPress={() => navigation.navigate('History')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 240,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    gap: 10,
    marginVertical: 10,
    width: '100%',
  },
});

export default MainMenuScreen;
