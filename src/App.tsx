import { SettingsProvider } from './features/settings/context/settings.provider';
import { WordsProvider } from './features/words/context/words.provider';
import { Words } from './features/words/Words';

export const App = () => {
  return (
    <SettingsProvider>
      <WordsProvider>
        <Words />
      </WordsProvider>
    </SettingsProvider>
  );
};
