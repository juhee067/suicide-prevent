import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexColumnCenterDiv } from "../styled/FlexDiv";
import { Paragraph } from "../styled/styledSpanagraph";
import AnswerButton from "./AnswerButton";

const CardBox = styled(FlexColumnCenterDiv)``;

const DescBox = styled.div`
  padding: 50px;
  margin-bottom: 30px;
  width: 70%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
`;
const Button = styled.div``;

const SelectBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  > * {
    flex: 1;
  }
`;
interface Answer {
  selected: boolean;
  id: number;
  score: number;
  content: string;
}

interface CardProps {
  description: string;
  answers: Answer[];
  handleAnswerNumber: (questionId: number, selectedScore: number) => void;
  active: number;
  selectedAnswerScore: number | undefined;
}

const Card = ({ description, answers, handleAnswerNumber, active, selectedAnswerScore }: CardProps) => {
  useEffect(() => {
    // console.log(answers, "sss");
  });

  return (
    <CardBox>
      <DescBox>
        <Paragraph>{description}</Paragraph>
      </DescBox>
      <SelectBox as="li">
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            id={answer.id}
            score={answer.score}
            content={answer.content}
            selected={answer.selected}
            onClick={() => {
              handleAnswerNumber(active, answer.score);
              console.log(answer.id, "answer.id");
              console.log(active, "active");
            }}
            // selected={true}
          />
        ))}
      </SelectBox>
    </CardBox>
  );
};

export default Card;
