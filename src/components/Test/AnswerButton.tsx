import React from "react";
import styled from "styled-components";
import { Btn } from "../styled/styledSpanagraph";
const AnswerBtn = styled(Btn)<{ selected: boolean }>`
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  border-radius: 5px;
  padding: 10px;
  ${({ selected }) =>
    selected &&
    ` background-color: #ffce0a;
    
  `}
  &:hover {
    background-color: ${({ selected }) => (selected ? "#ffce0a" : "#e3e3e3")};
  }
`;

interface AnswerButtonProps {
  content: string;
  onClick: () => void;
  selected: boolean;
  id: number;
}
const AnswerButton = ({ content, onClick, selected, id }: AnswerButtonProps) => {
  return (
    <AnswerBtn onClick={onClick} selected={selected}>
      {content}({id})
    </AnswerBtn>
  );
};

export default AnswerButton;
