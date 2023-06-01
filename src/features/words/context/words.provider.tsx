import { useReducer, ReactNode } from 'react';
import { WordsContext, WordsDispatchContext, wordsReducer } from './words.context';

type WordsProviderTypes = {
  children: ReactNode;
};

export const WordsProvider = ({ children }: WordsProviderTypes) => {
  const [words, dispatch] = useReducer(wordsReducer, {
    words: [],
    selectedRange: [],
    savedWords: [],
    selectedWord: null,
    hint: false
  });

  return (
    <WordsContext.Provider value={words}>
      <WordsDispatchContext.Provider value={dispatch}>{children}</WordsDispatchContext.Provider>
    </WordsContext.Provider>
  );
};
