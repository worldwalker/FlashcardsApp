import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useGlobalContext} from '../context/GlobalContext';
import {Flashcard} from '../types/common';

const FLASHCARDS_KEY = 'flashcards';

const AddFlashcard: React.FC = ({route, navigation}: any) => {
  const [flashcard, setFlashcard] = useState<Flashcard>({
    question: '',
    answer: '',
    id: '',
  });
  const {addFlashcard} = useGlobalContext();

  /** LIFECYCLE */

  /** HANDLERS */
  const handleInputChange = (name: keyof Flashcard, value: string) => {
    // Update the flashcard state with the new value
    setFlashcard(prevFlashcard => ({
      ...prevFlashcard,
      [name]: value,
    }));
  };

  const handleAddFlashcard = async () => {
    try {
      // Validate the flashcard
      if (!flashcard.question || !flashcard.answer) {
        Alert.alert('Please fill in both the question and answer');
        return;
      }

      // Get the existing flashcards from storage
      const flashcards = JSON.parse(
        (await AsyncStorage.getItem(FLASHCARDS_KEY)) || '[]',
      );

      const id = Date.now().toString();
      // Add the flashcard to storage
      await AsyncStorage.setItem(
        FLASHCARDS_KEY,
        JSON.stringify([...flashcards, {...flashcard, id: id}]),
      );

      addFlashcard({...flashcard, id: id});
      Alert.alert('Flashcard saved successfully');
    } catch (error) {
      console.log('Failed to save flashcard to storage:', error);
      Alert.alert('Failed to save flashcard to storage');
    }

    setFlashcard({
      question: '',
      answer: '',
      id: '',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.box}>
        <View style={styles.inputBox}>
          <Text style={styles.text}>Question</Text>
          <TextInput
            autoFocus={true}
            multiline={true}
            placeholder="Type your question here..."
            placeholderTextColor="#999"
            style={styles.input}
            value={flashcard.question}
            onChangeText={value => handleInputChange('question', value)}
          />
        </View>
        <View style={styles.inputBox}>
          <Text style={styles.text}>Answer</Text>
          <TextInput
            multiline={true}
            placeholder="Type the answer here..."
            placeholderTextColor="#999"
            style={styles.input}
            value={flashcard.answer}
            onChangeText={value => handleInputChange('answer', value)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddFlashcard}>
        <Text style={styles.buttonText}>Add Flashcard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  box: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
  },
  inputBox: {
    flex: 2,
  },
  text: {
    marginBottom: 10,
    color: 'green',
    fontSize: 20,
    alignSelf: 'center',
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 5,
    fontSize: 20,
    height: '85%',
  },
  addButton: {
    width: '100%',
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default AddFlashcard;
