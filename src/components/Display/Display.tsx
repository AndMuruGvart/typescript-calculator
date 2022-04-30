import React, {FC} from 'react';
import styled from 'styled-components';

interface DisplayProps {
  expression: string
  value: string
}

const StyledIndicatorList = styled.div`
  padding-top: 40px;
  font-size: 24px;
  line-height: 32px;
  color: #F2F2F2;
  text-align: right;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25em;
  min-height: 1em;
`;

const StyledExpression = styled.span`
  margin-left: auto;
`;

const StyleScreen = styled.div`
  font-size: 56px;
  line-height:80px;
  display: flex;
  align-items: center;
  justify-content: flex-end;  
  overflow: hidden;
  @media (max-width: 320px) {
    font-size: 10px;
    line-height:53px;
  }
`;

const StyledDisplay = styled.div`
  height: 159px;
  background-color: none;
  border-bottom: 2px solid rgba(255,255,255, 0.35);
  color: #F2F2F2;
  margin: 38px 46px 46px 46px;
`;

export const Screen: FC<DisplayProps> = ({expression, value}:DisplayProps) => {
  return (
    <div>
      <StyledDisplay>
      <StyledIndicatorList>
        <StyledExpression>
          {expression}
        </StyledExpression>
      </StyledIndicatorList>

      <StyleScreen>
        {value}
      </StyleScreen>
    </StyledDisplay>
    </div>
  );
};

export default Screen;
