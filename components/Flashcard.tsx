import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Flashcard as FlashcardType} from '../types/common';

const colors = [
  'red',
  'green',
  'orange',
  'gray',
  'brown',
  'blue',
  'pink',
  'purple',
  'cyan',
  'magenta',
];

type FlashcardProps = {
  navigation: any;
  card: FlashcardType;
};

const Flashcard: React.FC<FlashcardProps> = ({navigation, card}) => {
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  const [cardColor, setCardColor] = useState(getRandomColor());

  useEffect(() => {
    setCardColor(getRandomColor());
  }, []);

  const handleCardPress = (card: FlashcardType, cardColor: string) => {
    navigation.navigate('ChosenFlashCard', {card, cardColor});
  };

  return (
    <TouchableOpacity
      onPress={() => handleCardPress(card, cardColor)}
      style={[styles.card, {backgroundColor: cardColor}]}
      key={card.id}>
      <Text style={styles.text}>{card?.question}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    height: 200,
    width: 180,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '500',
  },
});

export default Flashcard;
