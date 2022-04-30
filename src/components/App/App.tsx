import React, {FunctionComponent, useState} from 'react';
import styled from 'styled-components';
import Display from '../Display/Display';
import Pad from '../Pad/Pad';
import {Digit, Operator} from '../../lib/types';

const Container = styled.div`
  width: 100%;
  width: 616px;
  height:876px;
  background: #CB7171;
  border-radius: 18px;
  backdrop-filter: blur(4px);
`;


const StyledApp = styled.div`
  margin: auto;
  padding-top:0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue" ,Arial ,sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  max-width: 554px;
  height:800px;
  background: linear-gradient(155.23deg, #28518E 0%, #3A77D1 100%);
  box-shadow: 0px 82px 158px rgba(0, 0, 0, 0.35), 0px 24.7206px 47.6324px rgba(0, 0, 0, 0.228056), 0px 10.2677px 19.7841px rgba(0, 0, 0, 0.175), 0px 3.71362px 7.1555px rgba(0, 0, 0, 0.121944);
  opacity:1;
  border-radius: 18px;

`;


export const App: FunctionComponent = () => {
  // Calculator's states
  const [result, setResult] = useState<number>(0);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);
  const [pendingOperator, setPendingOperator] = useState<Operator>();
  const [display, setDisplay] = useState<string>('0');

  const calculate = (rightOperand: number, pendingOperator: Operator): boolean => {
    let newResult = result;

    switch (pendingOperator) {
      case '+':
        newResult += rightOperand;
        break;
      case '-':
        newResult -= rightOperand;
        break;
      case '×':
        newResult *= rightOperand;
        break;
      case '÷':
        if (rightOperand === 0) {
          return false;
        }

        newResult /= rightOperand;

    }

    setResult(newResult);
    setDisplay(newResult.toString().toString().slice(0, 12));

    return true;
  };

  const calculatePercent = (rightOperand: number, pendingOperator: Operator): boolean => {
    let newResult = result;

    switch (pendingOperator) {
      case '+':
        newResult = newResult*(1+ rightOperand/100);
        break;
      case '-':
        newResult = newResult*(1- rightOperand/100);
        break;
      case '×':
        newResult = newResult*(rightOperand)/100;
        break;
      case '÷':
        if (rightOperand === 0) {
          return false;
        }

        newResult = newResult/(rightOperand)*100;

    }

    setResult(newResult);
    setDisplay(newResult.toString().toString().slice(0, 12));

    return true;
  };

  const onCalculateHundred = () => {
    const increasedOperand = Number(display)*100;
    setDisplay(increasedOperand.toString().slice(0, 12));
  };

  const onCalculateSqrt = () => {
    const sqrtOperand = Math.sqrt(Number(display));   
    setDisplay(sqrtOperand.toString().slice(0, 12));
  };

  // Pad buttons handlers
  const onDigitButtonClick = (digit: Digit) => {
    let newDisplay = display;

    if ((display === '0' && digit === 0) || display.length > 12) {
      return;
    }

    if (waitingForOperand) {
      newDisplay = '';
      setWaitingForOperand(false);
    }

    if (display !== '0') {
      newDisplay = newDisplay + digit.toString();
    } else {
      newDisplay = digit.toString();
    }

    setDisplay(newDisplay);
  };

  const onPointButtonClick = () => {
    let newDisplay = display;

    if (waitingForOperand) {
      newDisplay = '0';
    }

    if (newDisplay.indexOf('.') === -1) {
      newDisplay = newDisplay + '.';
    }

    setDisplay(newDisplay);
    setWaitingForOperand(false);
  };

  const onPercentButtonClick = () => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculatePercent(operand, pendingOperator)) {
        return;
      }
    } else {
      setResult(operand);
    }

    setWaitingForOperand(true);
  };

  const onOperatorButtonClick = (operator: Operator) => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }
    } else {
      setResult(operand);
    }

    setPendingOperator(operator);
    setWaitingForOperand(true);
  };


  const onEqualButtonClick = () => {
    const operand = Number(display);

    if (typeof pendingOperator !== 'undefined' && !waitingForOperand) {
      if (!calculate(operand, pendingOperator)) {
        return;
      }

      setPendingOperator(undefined);
    } else {
      setDisplay(operand.toString());
    }

    setResult(operand);
    setWaitingForOperand(true);
  };

  const onAllClearButtonClick = () => {
    setResult(0);
    setPendingOperator(undefined);
    setDisplay('0');
    setWaitingForOperand(true);
  };


  return (
    <Container>
      <StyledApp>
        <Display value={display} expression={typeof pendingOperator !== 'undefined' ? `${result}${pendingOperator}${waitingForOperand ? '' : display}` : ''} />
        <Pad
          onDigitButtonClick={onDigitButtonClick}
          onPointButtonClick={onPointButtonClick}
          onOperatorButtonClick={onOperatorButtonClick}
          onEqualButtonClick={onEqualButtonClick}
          onAllClearButtonClick={onAllClearButtonClick}
          onPercentButtonClick={onPercentButtonClick}
          onCalculateHundred={onCalculateHundred}
          onCalculateSqrt={onCalculateSqrt}
        />
    </StyledApp>
    </Container>

  );

};

export default App;
