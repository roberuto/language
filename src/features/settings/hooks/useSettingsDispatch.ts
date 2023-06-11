import { useContext } from 'react';
import { SettingsDispatchContext } from '../context/settings.context';

export const useSettingsDispatcher = () => {
  const dispatch = useContext(SettingsDispatchContext);

  if (!dispatch) {
    throw Error('Settings dispatching is not available');
  }

  return dispatch;
};
