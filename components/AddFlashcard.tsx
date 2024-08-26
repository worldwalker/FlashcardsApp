import React, {useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';

interface Flashcard {
  question: string;
  answer: string;
}

const AddFlashcard: React.FC = () => {
  const [flashcard, setFlashcard] = useState<Flashcard>({
    question: '',
    answer: '',
  });

  const handleInputChange = (name: keyof Flashcard, value: string) => {
    setFlashcard(prevFlashcard => ({
      ...prevFlashcard,
      [name]: value,
    }));
  };

  const handleAddFlashcard = () => {
    // Add your logic here to save the flashcard
    console.log(flashcard);
    // Reset the form
    setFlashcard({
      question: '',
      answer: '',
    });
  };

  return (
    <View>
      <Text>Add Flashcard</Text>
      <View>
        <Text>Question:</Text>
        <TextInput
          style={{borderWidth: 1, padding: 5}}
          value={flashcard.question}
          onChangeText={value => handleInputChange('question', value)}
        />
      </View>
      <View>
        <Text>Answer:</Text>
        <TextInput
          style={{borderWidth: 1, padding: 5}}
          value={flashcard.answer}
          onChangeText={value => handleInputChange('answer', value)}
        />
      </View>
      <Button title="Add Flashcard" onPress={handleAddFlashcard} />
    </View>
  );
};

export default AddFlashcard;
