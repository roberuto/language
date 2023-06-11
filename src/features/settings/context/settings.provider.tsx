import { useReducer, ReactNode } from 'react';
import { SettingsContext, SettingsDispatchContext, settingsReducer } from './settings.context';

type SettingsProviderTypes = {
  children: ReactNode;
};

export const SettingsProvider = ({ children }: SettingsProviderTypes) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    wordPerSet: 50,
    randomWordsOrder: true,
  });

  return (
    <SettingsContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>{children}</SettingsDispatchContext.Provider>
    </SettingsContext.Provider>
  );
};
