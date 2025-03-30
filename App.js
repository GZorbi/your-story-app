import React, { useState } from 'react';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { Text, View, TextInput, Pressable, ScrollView, StyleSheet, Platform, Image } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const beginningsEN = [
  "As she walked into the café, the familiar scent of coffee mingled with something unexpected—his cologne...",
  "The day the stars vanished was the day humanity learned to look inward...",
  "The old house on the corner had been empty for decades, but every night, laughter echoed...",
  "Detective Elena Rivers knew she’d stumbled upon something unusual when the victim’s watch was still ticking...",
  "In a realm where seasons fought for dominance, Lira could summon the whispers of spring.",
  "As the clock struck midnight, Jake received a message: 'I’m closer than you think.'"
];

const beginningsGR = [
  "Καθώς μπήκε στο καφέ, η γνώριμη μυρωδιά αναμείχθηκε με κάτι απροσδόκητο — το άρωμά του...",
  "Την ημέρα που εξαφανίστηκαν τα άστρα, όλοι έστρεψαν το βλέμμα μέσα τους.",
  "Το παλιό σπίτι είχε χρόνια να κατοικηθεί, μα κάθε βράδυ ακουγόταν γέλιο...",
  "Η ντετέκτιβ Ρίβερς ήξερε πως κάτι δεν πήγαινε καλά όταν είδε το ρολόι να δουλεύει...",
  "Σε κόσμο όπου οι εποχές πολεμούσαν, η Λύρα καλούσε την άνοιξη με ψιθύρους.",
  "Μεσάνυχτα. Ένα μήνυμα εμφανίστηκε: 'Είμαι πιο κοντά απ’ όσο νομίζεις.'"
];

export default function App() {
  const [language, setLanguage] = useState('English');
  const [turns, setTurns] = useState(0);
  const [players, setPlayers] = useState(2);
  const [showInstructions, setShowInstructions] = useState(false);
  const [started, setStarted] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [fullStory, setFullStory] = useState('');
  const [input, setInput] = useState('');
  const [lastWords, setLastWords] = useState([]);

  const t = {
    welcome: language === 'Greek' ? "Καλώς ήρθατε στο 'Η Ιστορία Σου'!" : "Welcome to 'Your Story'!",
    selectLanguage: language === 'Greek' ? "Επιλέξτε γλώσσα" : "Select Language",
    selectTurns: language === 'Greek' ? "Επιλέξτε αριθμό γύρων" : "Select number of turns",
    selectPlayers: language === 'Greek' ? "Επιλέξτε αριθμό παικτών" : "Select number of players",
    instructionsBtn: language === 'Greek' ? "Πώς παίζεται" : "How to Play",
    instructions: language === 'Greek'
      ? "Ένα παιχνίδι παρέας όπου κάθε παίκτης προσθέτει ένα κομμάτι στην ιστορία. Ο σκοπός είναι να φτιάξετε μια τρελή, αστεία και απρόβλεπτη ιστορία που θα σας κάνει να γελάσετε όλοι μαζί στο τέλος! Κάθε παίκτης βλέπει μόνο τις τελευταίες τρεις λέξεις πριν συνεχίσει."
      : "This is a party game where each player adds a piece to a shared story. The goal is to create a crazy, funny and unpredictable narrative that everyone will laugh about in the end! Each player sees only the last three words before continuing.",
    startGame: language === 'Greek' ? "Έναρξη Παιχνιδιού" : "Start Game",
    continue: language === 'Greek' ? "Συνεχίστε την ιστορία (τουλάχιστον 3 λέξεις):" : "Continue the story (min 3 words):",
    submit: language === 'Greek' ? "Υποβολή" : "Submit",
    quit: language === 'Greek' ? "Διακοπή Παιχνιδιού" : "Quit Game",
    finalStory: language === 'Greek' ? "Η πλήρης ιστορία σας είναι:" : "Your full story is:",
    lastWords: language === 'Greek' ? "Οι τελευταίες τρεις λέξεις ήταν:" : "The last three words were:",
    round: language === 'Greek' ? "Γύρος" : "Round",
    player: language === 'Greek' ? "Παίκτης" : "Player"
  };

  const handleStart = () => {
    const beginnings = language === 'Greek' ? beginningsGR : beginningsEN;
    const start = beginnings[Math.floor(Math.random() * beginnings.length)];
    setFullStory(start);
    setLastWords(start.trim().split(' ').slice(-3));
    setStarted(true);
    setCurrentTurn(0);
  };

  const handleSubmit = () => {
    const words = input.trim().split(' ');
    if (words.length < 3) return;
    const updated = fullStory + ' ' + input.trim();
    setFullStory(updated);
    setLastWords(words.slice(-3));
    setCurrentTurn(prev => prev + 1);
    setInput('');
  };

  const handleQuit = async () => {
    const shouldShare = confirm(language === 'Greek'
      ? 'Θέλετε να αποθηκεύσετε την ιστορία σας πριν την έξοδο;'
      : 'Do you want to save your story before quitting?');

    if (shouldShare) {
      const path = FileSystem.documentDirectory + 'story.txt';
      await FileSystem.writeAsStringAsync(path, fullStory);
      await Sharing.shareAsync(path);
    }

    setStarted(false);
    setInput('');
    setCurrentTurn(0);
    setFullStory('');
    setLastWords([]);
  };

  const currentPlayer = (currentTurn % players) + 1;

  return (
    <ScrollView style={styles.container}>
      {!started ? (
        <Animated.View entering={FadeIn} style={styles.card}>
          <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/29/29302.png' }} style={styles.logo} />
          <Text style={styles.title}>{t.welcome}</Text>
          <Text>{t.selectLanguage}</Text>
          <View style={styles.row}>
            <Pressable
              style={[styles.optionButton, language === 'English' && styles.selectedButton]}
              onPress={() => setLanguage('English')}>
              <Text style={styles.optionText}>English</Text>
            </Pressable>
            <Pressable
              style={[styles.optionButton, language === 'Greek' && styles.selectedButton]}
              onPress={() => setLanguage('Greek')}>
              <Text style={styles.optionText}>Ελληνικά</Text>
            </Pressable>
          </View>

          <Text>{t.selectTurns}</Text>
          <View style={styles.row}>
            {[10, 20, 30].map(n => (
              <Pressable
                key={n}
                style={[styles.optionButton, turns === n && styles.selectedButton]}
                onPress={() => setTurns(n)}>
                <Text style={styles.optionText}>{n}</Text>
              </Pressable>
            ))}
          </View>

          <Text>{t.selectPlayers}</Text>
          <View style={styles.row}>
            {[2, 3, 4].map(p => (
              <Pressable
                key={p}
                style={[styles.optionButton, players === p && styles.selectedButton]}
                onPress={() => setPlayers(p)}>
                <Text style={styles.optionText}>{p}</Text>
              </Pressable>
            ))}
          </View>

          <Pressable
            style={[styles.mainButton, !turns && styles.disabledButton]}
            onPress={handleStart}
            disabled={!turns}
          >
            <Text style={styles.buttonText}>{t.startGame}</Text>
          </Pressable>

          <Pressable onPress={() => setShowInstructions(!showInstructions)}>
            <Text style={styles.instructionsToggle}>{t.instructionsBtn}</Text>
          </Pressable>

          {showInstructions && <Text style={styles.instructions}>{t.instructions}</Text>}
        </Animated.View>
      ) : currentTurn < turns ? (
        <View style={styles.card}>
          <Text style={styles.title}>{`${t.round} ${currentTurn + 1} / ${turns} — ${t.player} ${currentPlayer}`}</Text>
          <Text style={styles.instructions}>{t.lastWords} {lastWords.join(' ')}</Text>
          <Text style={styles.instructions}>{t.continue}</Text>
          <TextInput
            value={input}
            onChangeText={setInput}
            multiline
            placeholder="..."
            style={styles.input}
          />
          <View style={styles.row}>
            <Pressable style={styles.mainButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>{t.submit}</Text>
            </Pressable>
            <Pressable style={styles.optionButton} onPress={handleQuit}>
              <Text>{t.quit}</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.title}>{t.finalStory}</Text>
          <Text style={styles.instructions}>{fullStory}</Text>
          <Pressable style={styles.mainButton} onPress={async () => {
            const path = FileSystem.documentDirectory + 'story.txt';
            await FileSystem.writeAsStringAsync(path, fullStory);
            await Sharing.shareAsync(path);
          }}>
            <Text style={styles.buttonText}>{language === 'Greek' ? 'Αποθήκευση Ιστορίας' : 'Save Story'}</Text>
          </Pressable>
          <Pressable style={styles.optionButton} onPress={handleQuit}>
            <Text>{t.quit}</Text>
          </Pressable>
        </View>
      )}
      <Text style={{ textAlign: 'right', fontSize: 12, opacity: 0.6, marginTop: 10 }}>GZapps</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: Platform.OS === 'android' ? 30 : 60,
    backgroundColor: '#fef9f4',
  },
  card: {
    backgroundColor: '#fff8e1',
    borderRadius: 20,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10
  },
  optionButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginHorizontal: 5
  },
  selectedButton: {
    backgroundColor: '#ff9800',
    transform: [{ scale: 1.08 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500'
  },
  mainButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20
  },
  disabledButton: {
    backgroundColor: '#ccc'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  instructions: {
    marginTop: 10,
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 20
  },
  instructionsToggle: {
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    color: '#3e2723'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4e342e'
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    backgroundColor: '#fff'
  }
});
