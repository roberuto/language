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
  const [hint, setHint] = useState(false);

  useEffect(() => {
    setHint(props.showAnswer);
  }, [props.showAnswer]);

  useEffect(() => {
    if (hint) {
      setValue(props.word.romaji);
    }
  }, [hint]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setHasError(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const error = !!(value && value.toLowerCase() !== props.word.romaji);

      if (!error) {
        props.changeWord(!value);
        setHint(false);
        setValue('');
      }

      setHasError(error);
    }

    if (event.key === 'Escape') {
      setHint(true);
    }
  };

  const handleDoubleClick = () => {
    setHint(true);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onDoubleClick={handleDoubleClick}
      error={hasError}
      inputProps={{ style: { fontSize: 40 } }}
    />
  );
};
