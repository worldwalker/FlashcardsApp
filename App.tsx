import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import FlashcardList from './components/FlashcardList';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types/common';
import AddFlashcard from './components/AddFlashcard';
import ChosenFlashCard from './components/ChosenFlashCard';
import {GlobalProvider} from './context/GlobalContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Flashcards">
          <Stack.Screen
            name="Flashcards"
            component={FlashcardList}
            options={{title: 'Flashcards'}}
          />
          <Stack.Screen
            name="AddFlashcard"
            component={AddFlashcard}
            options={{title: 'Add Flashcard'}}
          />
          <Stack.Screen
            name="ChosenFlashCard"
            component={ChosenFlashCard}
            options={{title: 'Chosen Flashcard'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
