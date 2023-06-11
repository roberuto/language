import { useSettingsDispatcher } from './useSettingsDispatch';

export const useSettingsActions = () => {
  const dispatch = useSettingsDispatcher();

  const setWordsPerSet = (numberOfWords: number) => {
    dispatch({ type: 'setWordsPerSet', data: numberOfWords });
  };

  return {
    setWordsPerSet,
  };
};
