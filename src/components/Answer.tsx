import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Word } from '../context/words';

type AnswerProps = {
  word: Word;
  showAnswer: boolean;
  changeWord: (skip?: boolean) => void;
};

export const Answer = (props: AnswerProps) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if(props.showAnswer) {
      setValue(props.word.romaji);
    }
  }, [props.showAnswer])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setHasError(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }

    const error = !!(value && value !== props.word.romaji);

    if (!error) {
      props.changeWord(!value);
      setValue('');
    }

    setHasError(error);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      error={hasError}
      inputProps={{ style: { fontSize: 40 } }}
    />
  );
};
