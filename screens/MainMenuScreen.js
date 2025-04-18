
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function MainMenuScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={require('../assets/menu_logo_clean.png')} style={styles.logo} resizeMode="contain" />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Game')}> {/* Quick Game */}
        <Text style={styles.buttonText}>Quick Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Options')}> {/* Full Game Options */}
        <Text style={styles.buttonText}>Start New Game</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}> {/* View Story History */}
        <Text style={styles.buttonText}>View Story History</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Language')}> {/* Language Selection */}
        <Text style={styles.buttonText}>Language / Γλώσσα</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 220,
    height: 150,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#593d63', // Απόχρωση από το λογότυπο και μενού ρυθμίσεων
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MainMenuScreen;
