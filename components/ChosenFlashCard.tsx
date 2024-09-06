import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Flashcard} from '../types/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGlobalContext} from '../context/GlobalContext';

type ChosenFlashCardProps = {
  navigation: any;
  route: {params: {card: Flashcard; cardColor: string}};
};

const ChosenFlashCard = ({route, navigation}: ChosenFlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;
  const {card, cardColor} = route.params;
  const {removeFlashcard} = useGlobalContext();
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });
  const frontAnimatedStyle = {
    transform: [{rotateY: frontInterpolate}],
  };
  const backAnimatedStyle = {
    transform: [{rotateY: backInterpolate}],
  };

  /** HANDLERS */
  const handleDelete = async () => {
    try {
      // Get the existing flashcards from storage
      const flashcards: Flashcard[] = JSON.parse(
        (await AsyncStorage.getItem('flashcards')) || '[]',
      );
      console.log('flashcards', JSON.stringify(flashcards, null, 2));

      // Remove the flashcard from storage
      const filteredFlashcards = await AsyncStorage.setItem(
        'flashcards',
        JSON.stringify(
          flashcards.filter(flashcard => flashcard.id !== card.id),
        ),
      );

      console.log('filteredFlashcards', filteredFlashcards);

      // Update the flashcards in the context
      removeFlashcard(card.id);
      Alert.alert('Flashcard deleted successfully');
    } catch (error) {
      console.log('Failed to delete flashcard:', error);
      Alert.alert('Failed to delete flashcard');
    }

    navigation.navigate('Flashcards');
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={flipCard} style={styles.container}>
        {isFlipped ? (
          <Animated.View
            style={[
              styles.card,
              backAnimatedStyle,
              {backgroundColor: cardColor},
            ]}>
            <Text style={styles.cardTitle}>Answer:</Text>
            <Text style={styles.cardText}>{card.answer}</Text>
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              styles.card,
              frontAnimatedStyle,
              {backgroundColor: cardColor},
            ]}>
            <Text style={styles.cardTitle}>Question:</Text>
            <Text style={styles.cardText}>{card.question}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    borderRadius: 10,
    backfaceVisibility: 'hidden',
    position: 'absolute',
    width: '90%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontCard: {
    backgroundColor: 'white',
  },
  backCard: {
    backgroundColor: 'blue',
    transform: [{rotateY: '180deg'}],
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  cardText: {
    fontSize: 22,
    fontWeight: '500',
    color: 'white',
  },
  button: {
    width: '90%',
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChosenFlashCard;
