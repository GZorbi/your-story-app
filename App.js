// ΠΛΗΡΗΣ ΚΩΔΙΚΑΣ ΕΦΑΡΜΟΓΗΣ "YOUR STORY" ΜΕ ΠΟΛΛΑΠΛΕΣ ΓΛΩΣΣΕΣ ΚΑΙ ΔΥΝΑΜΙΚΑ BACKGROUNDS

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, TextInput, Share, Alert, ImageBackground, StyleSheet, I18nManager } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const categoryPrompts = {
  English: {
    Comedy: [
      "The wizard pulled a croissant from his robe and muttered, 'This will hurt.'",
      "The dragon didn’t breathe fire—just a burnt CD of ‘90s love songs.",
      "The king raised his sword and shouted, 'Who left their Tupperware in the throne room?!'",
      "In the middle of the galactic war, the captain paused to fix his hair.",
      "At the edge of the map, all they found was a pizza place with free Wi-Fi."
    ],
    Horror: [
      "The door slammed shut behind him, and a voice whispered: 'You’re finally home, Mother…'",
      "The phone rang again—even though the line had been dead for 12 years.",
      "His reflection smiled back at him. Only the reflection did.",
      "The attic wall began dripping red paint… or so they thought—until it spelled a name.",
      "The doll had moved again. This time, it held the key to the locked room."
    ],
    Romance: [
      "She loved him like a dying star loves its final light—fiercely and with no hope of return.",
      "He smelled of old books, dried roses, and a summer she never got over.",
      "They met on a rainy Thursday, and by Friday, she had planned the wedding—or the escape.",
      "Her heart didn’t break—it folded like the letters she never sent.",
      "He promised to wait forever. She believed him—until forever knocked and asked for directions."
    ],
    Fantasy: [
      "The sky turned violet as the ancient bells rang—for the first time in a thousand years.",
      "She was born during the eclipse, her breath laced with frost and a name no one dared speak.",
      "At the edge of the forgotten kingdom, a boy found a crown—and it whispered.",
      "He carried the last ember of a fallen world in a jar, guarded by silence and salt.",
      "The forest bowed as she passed—not out of respect, but because it remembered her mother."
    ],
    Mystery: [
      "The letter had no return address—just a single black feather inside.",
      "When she opened the music box, it played backwards, and the lights flickered.",
      "The detective paused. The victim was missing—but the crime scene still bled.",
      "Three keys, two clocks, and one name carved into the floorboards: hers.",
      "No one remembered building the lighthouse. Yet its light had never gone out."
    ]
  },
  Greek: {
    Comedy: [
      "Ο μάγος έβγαλε ένα κρουασάν από τον μανδύα του και ψιθύρισε: 'Αυτό θα πονέσει.'",
      "Ο δράκος δεν έβγαζε φωτιά—μόνο ένα καμμένο CD με ερωτικά τραγούδια των '90s.",
      "Ο βασιλιάς σήκωσε το σπαθί του και φώναξε: 'Ποιος άφησε το τάπερ του στο θρόνο;'",
      "Μέσα στον γαλαξιακό πόλεμο, ο καπετάνιος σταμάτησε για να φτιάξει τα μαλλιά του.",
      "Στο τέλος του χάρτη, βρήκαν μόνο μια πιτσαρία με δωρεάν Wi-Fi."
    ],
    Horror: [
      "Η πόρτα έκλεισε απότομα πίσω του, και μια φωνή ψιθύρισε: 'Καλώς ήρθες σπίτι, Μαμά…'",
      "Το τηλέφωνο ξαναχτύπησε—παρόλο που η γραμμή ήταν νεκρή εδώ και 12 χρόνια.",
      "Η αντανάκλασή του χαμογέλασε πίσω του. Μόνο η αντανάκλαση όμως.",
      "Ο τοίχος της σοφίτας άρχισε να στάζει κόκκινη μπογιά… μέχρι που σχημάτισε ένα όνομα.",
      "Η κούκλα είχε μετακινηθεί ξανά. Αυτή τη φορά κρατούσε το κλειδί του κλειδωμένου δωματίου."
    ],
    Romance: [
      "Τον αγάπησε όπως ένα άστρο λίγο πριν σβήσει—παθιασμένα και χωρίς ελπίδα επιστροφής.",
      "Μύριζε παλιά βιβλία, αποξηραμένα τριαντάφυλλα και ένα καλοκαίρι που δεν ξεπέρασε ποτέ.",
      "Γνωρίστηκαν μια βροχερή Πέμπτη, και μέχρι την Παρασκευή, είχε ήδη σχεδιάσει τον γάμο—ή την απόδραση.",
      "Η καρδιά της δεν ράγισε—δίπλωσε σαν τα γράμματα που ποτέ δεν έστειλε.",
      "Υποσχέθηκε να την περιμένει για πάντα. Τον πίστεψε—μέχρι που το 'πάντα' χτύπησε την πόρτα και ζήτησε οδηγίες."
    ],
    Fantasy: [
      "Ο ουρανός βάφτηκε μοβ καθώς οι αρχαίες καμπάνες ήχησαν—για πρώτη φορά μετά από χίλια χρόνια.",
      "Γεννήθηκε κατά τη διάρκεια της έκλειψης, με ανάσα παγωμένη και όνομα που κανείς δεν τολμούσε να προφέρει.",
      "Στο όριο του ξεχασμένου βασιλείου, ένα αγόρι βρήκε ένα στέμμα—και αυτό του ψιθύρισε.",
      "Μετέφερε τη τελευταία σπίθα ενός χαμένου κόσμου σε ένα βάζο, φυλαγμένο με σιωπή και αλάτι.",
      "Το δάσος υποκλίθηκε καθώς περνούσε—όχι από σεβασμό, αλλά επειδή θυμόταν τη μητέρα της."
    ],
    Mystery: [
      "Το γράμμα δεν είχε αποστολέα—μόνο ένα μαύρο φτερό μέσα.",
      "Όταν άνοιξε το μουσικό κουτί, έπαιζε ανάποδα και τα φώτα τρεμόπαιξαν.",
      "Ο ντετέκτιβ σταμάτησε. Το θύμα είχε εξαφανιστεί—αλλά η σκηνή του εγκλήματος αιμορραγούσε ακόμα.",
      "Τρία κλειδιά, δύο ρολόγια και ένα όνομα χαραγμένο στο πάτωμα: το δικό της.",
      "Κανείς δεν θυμόταν πότε χτίστηκε ο φάρος. Κι όμως, το φως του δεν είχε σβήσει ποτέ."
    ]
  }
};
// ΠΛΗΡΗΣ ΚΩΔΙΚΑΣ ΕΦΑΡΜΟΓΗΣ "YOUR STORY"
// Περιλαμβάνει: UI, εναλλαγή γλώσσας, οδηγίες, θεματικές κατηγορίες, backgrounds, επανεκκίνηση, αρχικές προτάσεις (EN/GR)



const backgrounds = {
  Comedy: require('./assets/default.jpg'),
  Horror: require('./assets/horror.jpg'),
  Romance: require('./assets/romance.jpg'),
  Fantasy: require('./assets/fantasy.jpg'),
  Mystery: require('./assets/mystery.jpg')
};

const prompts = categoryPrompts;


export default function App() {
  const [language, setLanguage] = useState('English');
  const [category, setCategory] = useState('Comedy');
  const [rounds, setRounds] = useState(5);
  const [players, setPlayers] = useState(2);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [story, setStory] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [showInstructions, setShowInstructions] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [startPrompt, setStartPrompt] = useState('');

  const t = language === 'Greek' ? {
    instructions: 'Οδηγίες Παιχνιδιού',
    howToPlay: '🎲 Πώς παίζεται: Παίξτε εναλλάξ γράφοντας την ιστορία. Ο πρώτος παίκτης ξεκινά με την αρχική πρόταση. Οι υπόλοιποι βλέπουν μόνο τις 3 τελευταίες λέξεις και συνεχίζουν με ό,τι τους κατέβει! Στόχος; Το χάος και το γέλιο! 😂',
    chooseLang: 'Επιλογή γλώσσας',
    chooseCategory: 'Επιλογή κατηγορίας',
    start: 'Έναρξη',
    newGame: 'Νέο Παιχνίδι',
    save: 'Αποθήκευση',
    next: 'Επόμενο'
  } : {
    instructions: 'Game Instructions',
    howToPlay: '🎲 How to play: Take turns writing the story. Player 1 sees the full prompt. Next players only see the last 3 words. Go wild! The goal? Chaos and laughter! 😂',
    chooseLang: 'Choose Language',
    chooseCategory: 'Choose Category',
    start: 'Start',
    newGame: 'New Game',
    save: 'Save',
    next: 'Next'
  };

  const resetGame = () => {
    setCurrentRound(1);
    setCurrentPlayer(1);
    setStory('');
    setHistory([]);
    setInput('');
    setGameStarted(false);
    setStartPrompt('');
  };

  const handleStart = () => {
    const chosen = prompts[language][category];
    const prompt = chosen[Math.floor(Math.random() * chosen.length)];
    setStartPrompt(prompt);
    setStory(prompt);
    setGameStarted(true);
  };

  const handleNext = () => {
    if (!input.trim()) {
      Alert.alert(
        language === 'Greek' ? 'Σφάλμα' : 'Error',
        language === 'Greek' ? 'Γράψε κάτι πρώτα!' : 'Please write something first!'
      );
      return;
    }

    const updated = story + ' ' + input;
    setStory(updated.trim());
    setInput('');
    setHistory([...history, input]);
    const totalTurns = rounds * players;
    const currentTurn = (currentRound - 1) * players + currentPlayer;

    if (currentTurn === totalTurns) {
      Alert.alert(
        language === 'Greek' ? 'Τέλος Παιχνιδιού' : 'Game Over',
        language === 'Greek' ? 'Θέλεις να αποθηκεύσεις την ιστορία;' : 'Do you want to save the story?',
        [
          {
            text: language === 'Greek' ? 'Όχι' : 'No',
            onPress: () => resetGame(),
            style: 'cancel'
          },
          {
            text: language === 'Greek' ? 'Ναι' : 'Yes',
            onPress: () => {
              saveStory(updated);
              resetGame();
            }
          }
        ]
      );
      return;
    }

    if (currentPlayer < players) {
      setCurrentPlayer(currentPlayer + 1);
    } else {
      setCurrentPlayer(1);
      setCurrentRound(currentRound + 1);
    }
  };

  const saveStory = async (text) => {
    const fileUri = FileSystem.documentDirectory + 'story.txt';
    await FileSystem.writeAsStringAsync(fileUri, text);
    await Sharing.shareAsync(fileUri);
  };

  const lastThreeWords = story.trim().split(' ').slice(-3).join(' ');

  return (
    <ImageBackground source={backgrounds[category]} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        {!gameStarted ? (
          <>
            <Image
              source={require('./assets/icon.png')}
              style={{ width: 150, height: 150, alignSelf: 'center', marginBottom: 20 }}
            />
            <TouchableOpacity onPress={() => setShowInstructions(!showInstructions)}>
              <Text style={styles.instructions}>{t.instructions}</Text>
            </TouchableOpacity>
            {showInstructions && <Text style={styles.paragraph}>{t.howToPlay}</Text>}

            <Text style={styles.label}>{t.chooseLang}</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => setLanguage('English')} style={[styles.button, language === 'English' && styles.selected]}><Text>EN</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setLanguage('Greek')} style={[styles.button, language === 'Greek' && styles.selected]}><Text>GR</Text></TouchableOpacity>
            </View>

            <Text style={styles.label}>{t.chooseCategory}</Text>
            <View style={styles.row}>
              {Object.keys(prompts[language]).map(cat => (
                <TouchableOpacity key={cat} onPress={() => setCategory(cat)} style={[styles.button, category === cat && styles.selected]}>
                  <Text>{cat}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.startButton} onPress={handleStart}>
              <Text style={styles.buttonText}>{t.start}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>{language === 'Greek' ? 'Γύρος' : 'Round'} {currentRound} / {rounds}</Text>
            <Text style={styles.label}>{language === 'Greek' ? 'Παίκτης' : 'Player'} {currentPlayer} / {players}</Text>
            <Text style={styles.prompt}>{currentRound === 1 && currentPlayer === 1 ? startPrompt : lastThreeWords}</Text>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder={language === 'Greek' ? 'Η συνέχεια...' : 'Continue the story...'}
              style={styles.input}
            />
            <TouchableOpacity onPress={handleNext} style={styles.startButton}>
              <Text style={styles.buttonText}>{t.next}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetGame} style={styles.newGameButton}>
              <Text style={styles.buttonText}>{t.newGame}</Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  container: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  instructions: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  paragraph: { fontSize: 16, marginBottom: 20 },
  label: { fontSize: 16, marginTop: 20 },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  button: { padding: 10, margin: 5, backgroundColor: '#ccc', borderRadius: 5 },
  selected: { backgroundColor: '#4caf50' },
  startButton: { backgroundColor: '#2196f3', padding: 15, marginTop: 20, borderRadius: 5 },
  newGameButton: { backgroundColor: '#f44336', padding: 15, marginTop: 10, borderRadius: 5 },
  buttonText: { color: 'white', textAlign: 'center' },
  prompt: { fontSize: 18, fontStyle: 'italic', marginVertical: 15 },
  input: { borderColor: 'gray', borderWidth: 1, padding: 10, backgroundColor: 'white' }
});
