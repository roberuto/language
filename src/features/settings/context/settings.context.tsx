import { createContext, Dispatch } from 'react';

export type SetWordsPerSetAction = {
  type: 'setWordsPerSet';
  data: number;
};

export type SetWordsOrderAction = {
  type: 'setWordsOrder';
  data: boolean;
};

export type SettingsActions = SetWordsPerSetAction;

export type SettingsState = {
  wordPerSet: number;
  randomWordsOrder: boolean;
};

export const SettingsContext = createContext<SettingsState | null>(null);
export const SettingsDispatchContext = createContext<Dispatch<SettingsActions> | null>(null);

export const settingsReducer = (state: SettingsState, action: SettingsActions) => {
  switch (action.type) {
    case 'setWordsPerSet': {
      return {
        ...state,
        wordPerSet: action.data,
      };
    }
  }
};
