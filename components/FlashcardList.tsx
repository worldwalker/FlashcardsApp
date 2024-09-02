// src/components/FlashcardList.tsx
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import Flashcard from './Flashcard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../context/GlobalContext';

const FLASHCARDS_KEY = 'flashcards';

const FlashcardList = ({navigation}: any) => {
  const {flashcards, addFlashcard, setFlashcards, removeFlashcard} =
    useGlobalContext();

  /** LIFECYCLE */
  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        const storedFlashcards =
          (await AsyncStorage.getItem(FLASHCARDS_KEY)) || '[]';

        setFlashcards(JSON.parse(storedFlashcards));
      } catch (error) {
        console.error('Failed to load flashcards from storage:', error);
      }
    };

    loadFlashcards();
  }, [navigation]);

  /** HANDLERS */
  const handleAddFlashcard = () => {
    navigation.navigate('AddFlashcard');
  };

  if (!flashcards.length) {
    return (
      <SafeAreaView style={styles.noFlashcardsContainer}>
        <Text style={[styles.text, {color: 'gray', marginTop: 50}]}>
          No flashcards found
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddFlashcard}>
          <Text style={styles.text}>Add Flashcard</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        {flashcards.map(card => {
          return (
            <Flashcard key={card?.id} card={card} navigation={navigation} />
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddFlashcard}>
        <Text style={styles.text}>Add Flashcard</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  noFlashcardsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    flexWrap: 'wrap',
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    width: '100%',
    backgroundColor: 'green',
    padding: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
});

export default FlashcardList;
