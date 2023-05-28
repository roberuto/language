import { useState, useEffect } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useWords, Word } from './context/words';
import { LoadWords } from './components/LoadWords';
import { Question } from './components/Question';
import { Answer } from './components/Answer';
import { Success } from './components/Success';

const NUMBER_OF_BUTTONS = 9;

const randomNumber = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function App() {
  const [wordsRange, setWordsRange] = useState<Word[]>([]);
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [selectedButton, setSelectedButton] = useState(1);
  const [buttonsStatus, setButtonsStatus] = useState(new Array(NUMBER_OF_BUTTONS).fill(false));
  const [showAnswer, setShowAnswer] = useState(false);

  const words = useWords();

  useEffect(() => {
    if (wordsRange.length) {
      handleWordsSelection();
    } else {
      if (selectedWord) {
        const buttons = buttonsStatus.slice();
        buttons[selectedButton - 1] = true;
        setButtonsStatus(buttons);
      }
      setSelectedWord(null);
    }
  }, [wordsRange]);

  useEffect(() => {
    if (words?.length) {
      handleWordsRange(1);
      setSelectedButton(1);
      setButtonsStatus(new Array(NUMBER_OF_BUTTONS).fill(false));
    } else {
      setWordsRange([]);
    }
  }, [words]);

  const handleWordsSelection = () => {
    if (!wordsRange.length) {
      return;
    }
    const idx = randomNumber(0, wordsRange.length - 1);
    const currentWord = wordsRange[idx];

    setShowAnswer(false);
    setSelectedWord(currentWord);
  };

  const handleWordsRange = (idx: number) => {
    if (!words?.length) {
      return;
    }
    const wordsPerRange = Math.ceil(words.length / NUMBER_OF_BUTTONS);
    const newWordsRange = words.slice(idx * wordsPerRange - wordsPerRange, wordsPerRange * idx);

    setSelectedButton(idx);
    setWordsRange(newWordsRange);
  };

  const handleWordChange = (skip?: boolean) => {
    if (skip) {
      handleWordsSelection();
    } else {
      const newWordsRange = wordsRange.filter((word) => word.id !== selectedWord?.id);
      setWordsRange(newWordsRange);
    }
  };

  const getButtonStatus = (idx: number) => {
    if (selectedButton === idx + 1) {
      return 'secondary';
    }
    if (buttonsStatus[idx]) {
      return 'success';
    }
    return 'primary';
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
        {!!words?.length && (
          <Grid container justifyContent="center" sx={{ '& button': { m: '4px' } }}>
            {buttonsStatus.map((_, idx: number) => (
              <Button
                key={idx}
                variant="contained"
                color={getButtonStatus(idx)}
                size="small"
                onClick={() => handleWordsRange(idx + 1)}
              >
                {idx + 1}
              </Button>
            ))}
          </Grid>
        )}

        <br />

        {selectedWord && (
          <>
            <Question word={selectedWord} showTranslations />
            <br />
            <Answer word={selectedWord} changeWord={handleWordChange} showAnswer={showAnswer} />
          </>
        )}

        <br />
        {words?.length ? (
          wordsRange.length ? (
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography>total: {wordsRange.length}</Typography>
              <Button onClick={() => setShowAnswer(true)}>HELP</Button>
            </Grid>
          ) : (
            <Success />
          )
        ) : (
          <Typography>LOAD WORDS</Typography>
        )}

        <br />
      </div>
    </>
  );
}

export default App;
