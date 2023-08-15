import React from "react";
import styled from "styled-components";
import { Btn } from "../../module/styled/styledSpanagraph";
const AnswerBtn = styled(Btn)`
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  border-radius: 5px;
  padding: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.color.SubGray};
    color: ${({ theme }) => theme.color.mainWhite};
  }
`;

interface AnswerButtonProps {
  content: string;
  onClick: () => void;
  id: number;
  score: number;
}
const AnswerButton = ({ content, onClick }: AnswerButtonProps) => {
  return <AnswerBtn onClick={onClick}>{content}</AnswerBtn>;
};

export default AnswerButton;
