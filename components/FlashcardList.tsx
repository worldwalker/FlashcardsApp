// src/components/FlashcardList.tsx
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import Flashcard from './Flashcard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Flashcard as FlashcardType} from '../types/common';

const FLASHCARDS_KEY = 'flashcards';

const FlashcardList = ({navigation}: any) => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);

  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const storedFlashcards = await AsyncStorage.getItem(FLASHCARDS_KEY);
        if (storedFlashcards) {
          setFlashcards(JSON.parse(storedFlashcards));
        }
      } catch (error) {
        console.error('Failed to load flashcards from storage:', error);
      }
    };

    loadFlashcards();
  }, []);

  // const addFlashcard = async (card: FlashcardType) => {
  //   const updatedFlashcards = [...flashcards, card];
  //   setFlashcards(updatedFlashcards);
  //   try {
  //     await AsyncStorage.setItem(
  //       FLASHCARDS_KEY,
  //       JSON.stringify(updatedFlashcards),
  //     );
  //   } catch (error) {
  //     console.error('Failed to save flashcards to storage:', error);
  //   }
  // };

  const addFlashcard = () => {
    navigation.navigate('AddFlashcard');
  };

  const removeFlashcard = async (id: string) => {
    const updatedFlashcards = flashcards.filter(card => card.id !== id);
    setFlashcards(updatedFlashcards);
    try {
      await AsyncStorage.setItem(
        FLASHCARDS_KEY,
        JSON.stringify(updatedFlashcards),
      );
    } catch (error) {
      console.error('Failed to save flashcards to storage:', error);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.list}>
        {flashcards.map(card => (
          <Flashcard key={card.id} card={card} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={addFlashcard}>
        <Text>Add Flashcard</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    flexWrap: 'wrap',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    alignItems: 'center',
  },
});

export default FlashcardList;
