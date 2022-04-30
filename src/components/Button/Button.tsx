import React, {FC} from 'react';

import styled, {css} from 'styled-components';

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
}

const colorToCss = () => {
  return css`
    background-color: transparent;
    color: #fff;

    &:hover {
      background-color: #3569B7;
    }
    &:focus {
      background-color: #FFF;
    }
  `;
};

export const StyledButton = styled.button<ButtonProps>`
  font-family: inherit;
  font-size: 36px;
  line-height:53px;
  border: none;
  border-radius: 100%;
  padding-top: 0.4em;
  padding-bottom: 0.5em;
  ${() => colorToCss()}


  position: relative;
  overflow: hidden;

  &:focus {
    color:#2B589A;
    outline: 0;
  }

  
`;

export const Button: FC<ButtonProps> = ({children, onClick}: ButtonProps) => {
  return (
    <StyledButton  onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
