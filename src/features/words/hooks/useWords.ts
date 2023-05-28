import { useContext } from 'react';
import { WordsContext } from '../context/words.context';

export const useWords = () => {
  const state = useContext(WordsContext);

  if (!state) {
    throw Error('Words state is not available');
  }

  return state;
};
