import { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useWords } from './hooks/useWords';
import { useWordsState } from './hooks/useWordsState';
import { useWordsDispatch } from './hooks/useWordsDispatch';
import { useSettingsState } from '../settings/hooks/useSettingsState';
import { useSettingsActions } from '../settings/hooks/useSettingsActions';
import { LoadWords } from './components/LoadWords';
import { SelectButtons } from './components/SelectButtons';
import { Question } from './components/Question';
import { Answer } from './components/Answer';
import { Success } from './components/Success';

export const Words = () => {
  const { words, selectedRange, selectedWord, savedWords } = useWordsState();
  const settingsState = useSettingsState();
  const { setWordsPerSet } = useSettingsActions();
  const { selectWord, selectRange, resetRange, changeWord, saveWord } = useWords(settingsState);
  const wordsDispatch = useWordsDispatch();

  useEffect(() => {
    if (selectedRange.length) {
      selectWord();
    } else {
      wordsDispatch({ type: 'selectWord', data: null });
    }
  }, [selectedRange]);

  useEffect(() => {
    if (words?.length) {
      selectRange(1);
    } else {
      resetRange();
    }
  }, [words]);

  const numberOfButtons = !words?.length ? 0 :  Math.ceil(words.length / settingsState.wordPerSet);

  return (
    <>
      <LoadWords fileName="masafumi_3.txt">Kanji 3</LoadWords>
      <LoadWords fileName="masafumi_4.txt">Kanji 4</LoadWords>
      <LoadWords fileName="n5_voc.txt">N5 Voc</LoadWords>
      <LoadWords fileName="kana.txt">Kana</LoadWords>
      <input
        type="number"
        value={settingsState.wordPerSet}
        onChange={(e) => {
          setWordsPerSet(Number(e.target.value));
        }}
      />
      <div className="container">
        <Typography variant="h3" align="center">
          LEARN JAPANESE
        </Typography>

        <br />

        {words?.length ? (
          <>
            <SelectButtons
              changeStatus={!selectedRange.length && !!selectedWord}
              numberOfButtons={numberOfButtons}
              onClick={(idx) => selectRange(idx)}
            />

            <br />

            {selectedWord && (
              <>
                <Question word={selectedWord} showTranslations />
                <br />
                <Answer word={selectedWord} changeWord={changeWord} />
              </>
            )}

            <br />

            {selectedRange.length ? (
              <>
                <Grid container alignItems="center" justifyContent="space-around">
                  <Typography>total: {selectedRange.length}</Typography>
                  {selectedWord && <Button onClick={saveWord}>SAVE WORD</Button>}
                  <Button onClick={() => wordsDispatch({ type: 'showHint', data: true })}>HELP</Button>
                </Grid>
                {!!savedWords.length && (
                  <Grid container alignItems="center" justifyContent="space-around">
                    <Button
                      onClick={() => {
                        setWordsPerSet(savedWords.length);
                        wordsDispatch({ type: 'loadSaved' });
                      }}
                    >
                      LOAD SAVED
                    </Button>
                    <Typography>saved: {savedWords.length}</Typography>
                  </Grid>
                )}
              </>
            ) : (
              <Success />
            )}
          </>
        ) : (
          <Typography>LOAD WORDS</Typography>
        )}

        <br />
      </div>
    </>
  );
};
