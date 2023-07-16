import React from "react";
import styled from "styled-components";
import { Btn } from "../styled/styledSpanagraph";
const AnswerBtn = styled(Btn)`
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  border-radius: 5px;
  padding: 10px;
  &:hover {
    background-color: #e3e3e3;
  }
`;

interface AnswerButtonProps {
  content: string;

  onClick: () => void;
}
const AnswerButton = ({ content, onClick }: AnswerButtonProps) => {
  return <AnswerBtn onClick={onClick}>{content}</AnswerBtn>;
};

export default AnswerButton;
