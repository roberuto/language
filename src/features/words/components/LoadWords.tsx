import { ReactNode } from 'react';
import { Button } from '@mui/material';
import { useWordsDispatch } from '../hooks/useWordsDispatch';
import { useSettingsDispatcher } from '../../settings/hooks/useSettingsDispatch';

type LoadWordsProps = {
  fileName: string;
  children: ReactNode;
};

export const LoadWords = (props: LoadWordsProps) => {
  const dispatchWords = useWordsDispatch();
  const dispatchSettings = useSettingsDispatcher();

  const handleClick = async () => {
    dispatchWords({
      type: 'load',
      data: [],
    });

    const request = await fetch(props.fileName);
    const text = await request.text();
    const arr = text.split('\n');

    const words = arr.map((line) => {
      const [kanji, kana, romaji, meaning] = line.split('\t');
      return { kanji, kana, romaji, meaning, id: (Math.random() + 1).toString(36).substring(2) };
    });

    const numberOfWords = Math.ceil(words.length / 10) || 50;

    dispatchSettings({ type: 'setWordsPerSet', data: numberOfWords });
    dispatchWords({ type: 'clearSaved' });

    dispatchWords({
      type: 'load',
      data: words,
    });
  };

  return <Button onClick={handleClick}>{props.children}</Button>;
};
