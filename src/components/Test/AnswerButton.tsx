import React from "react";
import styled from "styled-components";
import { Btn } from "../styled/styledSpanagraph";
const AnswerBtn = styled(Btn)`
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  border-radius: 5px;
  padding: 10px;
`;

const AnswerButton = ({ content }: any) => {
  return <AnswerBtn>{content}</AnswerBtn>;
};

export default AnswerButton;
