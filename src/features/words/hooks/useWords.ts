import { useWordsState } from './useWordsState';
import { useWordsDispatch } from './useWordsDispatch';
import { shuffle } from '../utils/random';
import { SettingsState } from '../../settings/context/settings.context';

export const useWords = (options: SettingsState) => {
  const state = useWordsState();
  const dispatch = useWordsDispatch();

  const selectWord = () => {
    if (!state.selectedRange.length) {
      return;
    }
    const currentWord = state.selectedRange[0];

    dispatch({ type: 'showHint', data: false });
    dispatch({ type: 'selectWord', data: currentWord });
  };

  const resetRange = () => {
    dispatch({ type: 'selectRange', data: [] });
  }

  const selectRange = (idx: number) => {
    if (!state.words?.length) {
      return;
    }
    dispatch({ type: 'selectWord', data: null });

    const wordsPerRange = options.wordPerSet;
    const newWordsRange = state.words.slice(idx * wordsPerRange - wordsPerRange, wordsPerRange * idx);

    dispatch({ type: 'selectRange', data: options.randomWordsOrder ? shuffle(newWordsRange) : newWordsRange });
  };

  const changeWord = (skip?: boolean) => {
    if (skip) {
      const [firstWord, ...rest] = state.selectedRange.slice();
      dispatch({ type: 'selectRange', data: [...(rest || []), firstWord] });
      selectWord();
    } else {
      const newWordsRange = state.selectedRange.filter((word) => word.id !== state.selectedWord?.id);
      dispatch({ type: 'selectRange', data: newWordsRange });
    }
  };

  const saveWord = () => {
    if (state.selectedWord) {
      dispatch({ type: 'saveWord', data: state.selectedWord });
    }

    const newWordsRange = state.selectedRange.filter((word) => word.id !== state.selectedWord?.id);
    dispatch({ type: 'selectRange', data: newWordsRange });
  };

  return {
    selectWord,
    selectRange,
    resetRange,
    changeWord,
    saveWord,
  };
};
