import { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';

type SelectButtonsProps = {
  numberOfButtons: number;
  changeStatus: boolean;
  onClick: (idx: number) => void;
};

export const SelectButtons = (props: SelectButtonsProps) => {
  const [selectedButton, setSelectedButton] = useState(1);
  const [buttonsStatus, setButtonsStatus] = useState(new Array(props.numberOfButtons).fill(false));

  useEffect(() => {
    setSelectedButton(1);
    setButtonsStatus(new Array(props.numberOfButtons).fill(false));
  }, [props.numberOfButtons]);

  useEffect(() => {
    if (props.changeStatus) {
      const buttons = buttonsStatus.slice();
      buttons[selectedButton - 1] = true;
      setButtonsStatus(buttons);
    }
  }, [props.changeStatus]);

  const getButtonStatus = (idx: number) => {
    if (selectedButton === idx + 1) {
      return 'secondary';
    }
    if (buttonsStatus[idx]) {
      return 'success';
    }
    return 'primary';
  };

  const handleClick = (idx: number) => {
    const currentNumber = idx + 1;
    setSelectedButton(currentNumber);
    props.onClick(currentNumber);
  };

  return (
    <Grid container justifyContent="center" sx={{ '& button': { m: '4px' } }}>
      {buttonsStatus.map((_, idx: number) => (
        <Button
          key={idx}
          variant="contained"
          color={getButtonStatus(idx)}
          size="small"
          onClick={() => handleClick(idx)}
        >
          {idx + 1}
        </Button>
      ))}
    </Grid>
  );
};
