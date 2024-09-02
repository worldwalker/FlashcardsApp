export interface Flashcard {
  id: string;
  question: string;
  answer: string;
}

export type RootStackParamList = {
  Flashcards: undefined;
  AddFlashcard: undefined;
  ChosenFlashCard: {card: Flashcard; cardColor: string};
};
