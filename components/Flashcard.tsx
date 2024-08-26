import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Flashcard as FlashcardType} from '../types/common';

interface FlashcardProps {
  card: FlashcardType;
}

const Flashcard: React.FC<FlashcardProps> = ({card}) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setShowAnswer(!showAnswer)}>
      <Text style={styles.text}>
        {showAnswer ? card.answer : card.question}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 200,
    width: 180,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Flashcard;
