import { useContext } from 'react';
import { WordsDispatchContext } from '../context/words.context';

export const useWordsDispatch = () => {
  const dispatch = useContext(WordsDispatchContext);

  if (!dispatch) {
    throw Error('Words dispatching is not available');
  }

  return dispatch;
};
