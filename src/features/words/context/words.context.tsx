import { createContext, Dispatch } from 'react';

export type Word = {
  id: string;
  kanji: string;
  romaji: string;
  meaning: string;
  kana: string;
};

export type LoadWordsAction = {
  type: 'load';
  data: Word[];
};

export type SelectWordsRangeAction = {
  type: 'selectRange';
  data: Word[];
};

export type SelectWordAction = {
  type: 'selectWord';
  data: Word | null;
};

export type ShowHintAction = {
  type: 'showHint';
  data: boolean;
};

export type SaveWordAction = {
  type: 'saveWord';
  data: Word;
};

export type ClearSavedWordsAction = {
  type: 'clearSaved';
};

export type LoadSavedWordsAction = {
  type: 'loadSaved';
};

type Actions =
  | LoadWordsAction
  | SelectWordsRangeAction
  | SelectWordAction
  | ShowHintAction
  | SaveWordAction
  | ClearSavedWordsAction
  | LoadSavedWordsAction;

type WordsState = {
  words: Word[];
  selectedRange: Word[];
  selectedWord: Word | null;
  savedWords: Word[];
  hint: boolean;
};

export const WordsContext = createContext<WordsState | null>(null);
export const WordsDispatchContext = createContext<Dispatch<Actions> | null>(null);

export const wordsReducer = (state: WordsState, action: Actions) => {
  switch (action.type) {
    case 'load': {
      return {
        ...state,
        words: action.data,
      };
    }
    case 'selectRange': {
      return {
        ...state,
        selectedRange: action.data,
      };
    }
    case 'selectWord': {
      return {
        ...state,
        selectedWord: action.data,
      };
    }
    case 'showHint': {
      return {
        ...state,
        hint: action.data,
      };
    }
    case 'saveWord': {
      return {
        ...state,
        savedWords: [...state.savedWords, action.data],
      };
    }
    case 'clearSaved': {
      return {
        ...state,
        savedWords: [],
      };
    }
    case 'loadSaved': {
      return {
        ...state,
        words: [...state.savedWords],
      };
    }
  }
};
