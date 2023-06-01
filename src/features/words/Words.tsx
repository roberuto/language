import { useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useWords } from './hooks/useWords';
import { useWordsDispatch } from './hooks/useWordsDispatch';
import { LoadWords } from './components/LoadWords';
import { SelectButtons } from './components/SelectButtons';
import { Question } from './components/Question';
import { Answer } from './components/Answer';
import { Success } from './components/Success';
import { randomNumber } from './utils/random';

const NUMBER_OF_BUTTONS = 9;

export const Words = () => {
  const { words, selectedRange, selectedWord, savedWords } = useWords();
  const wordsDispatch = useWordsDispatch();

  useEffect(() => {
    if (selectedRange.length) {
      handleWordsSelection();
    } else {
      wordsDispatch({ type: 'selectWord', data: null });
    }
  }, [selectedRange]);

  useEffect(() => {
    if (words?.length) {
      handleWordsRange(1);
    } else {
      wordsDispatch({ type: 'selectRange', data: [] });
    }
  }, [words]);

  const handleWordsSelection = () => {
    if (!selectedRange.length) {
      return;
    }
    const idx = randomNumber(0, selectedRange.length - 1);
    const currentWord = selectedRange[idx];

    wordsDispatch({ type: 'showHint', data: false });
    wordsDispatch({ type: 'selectWord', data: currentWord });
  };

  const handleWordsRange = (idx: number) => {
    if (!words?.length) {
      return;
    }
    wordsDispatch({ type: 'selectWord', data: null });

    const wordsPerRange = Math.ceil(words.length / NUMBER_OF_BUTTONS);
    const newWordsRange = words.slice(idx * wordsPerRange - wordsPerRange, wordsPerRange * idx);

    wordsDispatch({ type: 'selectRange', data: newWordsRange });
  };

  const handleWordChange = (skip?: boolean) => {
    if (skip) {
      handleWordsSelection();
    } else {
      const newWordsRange = selectedRange.filter((word) => word.id !== selectedWord?.id);
      wordsDispatch({ type: 'selectRange', data: newWordsRange });
    }
  };

  const saveWord = () => {
    if (selectedWord) {
      wordsDispatch({ type: 'saveWord', data: selectedWord });
    }

    const newWordsRange = selectedRange.filter((word) => word.id !== selectedWord?.id);
    wordsDispatch({ type: 'selectRange', data: newWordsRange });
  };

  return (
    <>
      <LoadWords fileName="masafumi_3.txt">Kanji 3</LoadWords>
      <LoadWords fileName="masafumi_4.txt">Kanji 4</LoadWords>
      <LoadWords fileName="n5_voc.txt">N5 Voc</LoadWords>
      <LoadWords fileName="kana.txt">Kana</LoadWords>
      <div className="container">
        <Typography variant="h3" align="center">
          LEARN JAPANESE
        </Typography>

        <br />

        {words?.length ? (
          <>
            <SelectButtons
              changeStatus={!selectedRange.length && !!selectedWord}
              numberOfButtons={NUMBER_OF_BUTTONS}
              onClick={(idx) => handleWordsRange(idx)}
            />

            <br />

            {selectedWord && (
              <>
                <Question word={selectedWord} showTranslations />
                <br />
                <Answer word={selectedWord} changeWord={handleWordChange} />
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
                    <Button onClick={() => wordsDispatch({ type: 'loadSaved' })}>LOAD SAVED</Button>
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
