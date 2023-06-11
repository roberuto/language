import { useContext } from 'react';
import { SettingsContext } from '../context/settings.context';

export const useSettingsState = () => {
  const state = useContext(SettingsContext);

  if (!state) {
    throw Error('Settings state is not available');
  }

  return state;
};
