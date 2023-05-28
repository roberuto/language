import { Typography } from '@mui/material';
import { Word } from '../context/words.context'

type QuestionProps = {
  word: Word;
  showTranslations: boolean;
};

export const Question = (props: QuestionProps) => {
  const translation = props.showTranslations && props.word.meaning ? `(${props.word.meaning})` : '';
  const question = `${props.word.kanji} ${translation}`.trim();

  return <Typography variant="h4" align="center">{question}</Typography>;
};
