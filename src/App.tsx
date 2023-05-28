import { WordsProvider } from './features/words/context/words.provider';
import { Words } from './features/words/Words';

export const App = () => {
  return (
    <WordsProvider>
      <Words />
    </WordsProvider>
  );
};
