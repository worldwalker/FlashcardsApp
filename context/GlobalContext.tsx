import React, {createContext, useContext, useState, ReactNode} from 'react';
import {Flashcard} from '../types/common';

interface GlobalContextType {
  flashcards: Flashcard[];
  addFlashcard: (flashcard: Flashcard) => void;
  removeFlashcard: (id: string) => void;
  setFlashcards: (flashcards: Flashcard[]) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({children}: {children: ReactNode}) => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  const addFlashcard = (flashcard: Flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  const removeFlashcard = (id: string) => {
    setFlashcards(flashcards.filter(card => card.id !== id));
  };

  return (
    <GlobalContext.Provider
      value={{flashcards, addFlashcard, removeFlashcard, setFlashcards}}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
