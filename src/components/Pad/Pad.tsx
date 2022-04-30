import React, {FunctionComponent, useEffect} from 'react';
import styled from 'styled-components';
import Button from '../Button/Button';
import {Digit, Operator} from '../../lib/types';

interface PadProps {
  onDigitButtonClick: (digit: Digit) => void
  onPointButtonClick: () => void
  onOperatorButtonClick: (operator: Operator) => void
  onEqualButtonClick: () => void
  onAllClearButtonClick: () => void
  onPercentButtonClick: () => void
  onCalculateHundred: () => void
  onCalculateSqrt: () => void
}

const StyledPad = styled.div`
  margin: 0 45px 0 45px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px 40px;
  grid-auto-rows: 1fr;
`;

export const Pad: FunctionComponent<PadProps> = ({
  onDigitButtonClick,
  onPointButtonClick,
  onOperatorButtonClick,
  onEqualButtonClick,
  onAllClearButtonClick,
  onPercentButtonClick,
  onCalculateHundred,
  onCalculateSqrt
}) => {
  const handleKeyDown = ({keyCode, shiftKey}: KeyboardEvent) => {
    console.log(keyCode);
    if (keyCode >= 48 && keyCode <= 57 && !shiftKey) {
      onDigitButtonClick((keyCode - 48) as Digit);
    } else if ((keyCode >= 96 && keyCode <= 105)) {
      onDigitButtonClick((keyCode - 96) as Digit);
    } else if (keyCode === 107 || (keyCode === 187 && shiftKey)) {
      onOperatorButtonClick('+');
    } else if (keyCode === 109 || keyCode === 189) {
      onOperatorButtonClick('-');
    } else if (keyCode === 106 || (keyCode === 56 && shiftKey)) {
      onOperatorButtonClick('×');
    } else if (keyCode === 111 || keyCode === 191) {
      onOperatorButtonClick('÷');
    } else if (keyCode === 13 || (keyCode === 187 && !shiftKey)) {
      onEqualButtonClick();
    } 
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleKeyDown);
    return () => document.body.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <StyledPad>
      <Button onClick={onAllClearButtonClick}>
        С
      </Button>
      <Button onClick={onCalculateSqrt}>
        &#8730;
      </Button>
      <Button onClick={ onPercentButtonClick}>
        %
      </Button>
      <Button  onClick={() => onOperatorButtonClick('÷')}>
        /
      </Button>
      <Button onClick={() => onDigitButtonClick(7)}>
        7
      </Button>
      <Button onClick={() => onDigitButtonClick(8)}>
        8
      </Button>
      <Button onClick={() => onDigitButtonClick(9)}>
        9
      </Button>
      <Button  onClick={() => onOperatorButtonClick('×')}>
        ×
      </Button>
      <Button onClick={() => onDigitButtonClick(4)}>
        4
      </Button>
      <Button onClick={() => onDigitButtonClick(5)}>
        5
      </Button>
      <Button onClick={() => onDigitButtonClick(6)}>
        6
      </Button>
      <Button  onClick={() => onOperatorButtonClick('-')}>
        -
      </Button>
      <Button onClick={() => onDigitButtonClick(1)}>
        1
      </Button>
      <Button onClick={() => onDigitButtonClick(2)}>
        2
      </Button>
      <Button onClick={() => onDigitButtonClick(3)}>
        3
      </Button>
      <Button  onClick={() => onOperatorButtonClick('+')}>
        +
      </Button>
      <Button onClick={onCalculateHundred}>
        oo
      </Button>
      <Button onClick={() => onDigitButtonClick(0)}>
        0
      </Button>
      <Button onClick={onPointButtonClick}>
        ,
      </Button>
      <Button  onClick={onEqualButtonClick}>
        =
      </Button>
    </StyledPad>
  );
};

export default Pad;
