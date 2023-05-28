import { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { TextField } from '@mui/material';
import { Word } from '../context/words.context';
import { useWords } from '../hooks/useWords';
import { useWordsDispatch } from '../hooks/useWordsDispatch';

type AnswerProps = {
  word: Word;
  changeWord: (skip?: boolean) => void;
};

export const Answer = (props: AnswerProps) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const { hint } = useWords();
  const wordsDispatch = useWordsDispatch();

  useEffect(() => {
    if (hint) {
      setValue(props.word.romaji);
      wordsDispatch({ type: 'showHint', data: false });
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
        wordsDispatch({ type: 'showHint', data: false });
        setValue('');
      } 

      setHasError(error);
    }

    if (event.key === 'Escape') {
      wordsDispatch({ type: 'showHint', data: true });
    }
  };

  const handleDoubleClick = () => {
    wordsDispatch({ type: 'showHint', data: true });
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
