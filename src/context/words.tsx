import { createContext, useReducer, useContext, ReactNode, Dispatch } from 'react';

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

type Actions = LoadWordsAction;

type WordsProviderTypes = {
  children: ReactNode;
};

const WordsContext = createContext<Word[] | null>(null);
const WordsDispatchContext = createContext<Dispatch<Actions> | null>(null);

const wordsReducer = (_words: Word[], action: Actions) => {
  switch (action.type) {
    case 'load': {
      return action.data;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export const WordsProvider = ({ children }: WordsProviderTypes) => {
  const [words, dispatch] = useReducer(wordsReducer, []);

  return (
    <WordsContext.Provider value={words}>
      <WordsDispatchContext.Provider value={dispatch}>{children}</WordsDispatchContext.Provider>
    </WordsContext.Provider>
  );
};

export const useWords = () => {
  return useContext(WordsContext);
};

export const useWordsDispatch = () => {
  const dispatch = useContext(WordsDispatchContext);

  if (!dispatch) {
    throw Error('Words dispatching is not available');
  }

  return dispatch;
};
