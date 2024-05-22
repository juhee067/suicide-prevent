import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FlexColumnCenterDiv } from '../../module/styled/FlexDiv';
import { Paragraph } from '../../module/styled/styledFont';
import AnswerButton from './AnswerButton';

const CardBox = styled(FlexColumnCenterDiv)``;

const DescBox = styled.div`
  padding: 50px;
  margin-bottom: 30px;
  width: 70%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  line-height: 1.5;
  @media screen and (max-width: 768px) {
    padding: 30px;
  }
  @media screen and (max-width: 375px) {
    padding: 20px;
  }
`;

const SelectBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  > * {
    flex: 1;
  }
  @media screen and (max-width: 480px) {
    width: 70%;
    gap: 10px;
  }
  @media screen and (max-width: 375px) {
    width: 70%;
    gap: 10px;
  }
`;

interface Answer {
  id: number;
  score: number;
  content: string;
}

interface CardProps {
  description: string;
  answers: Answer[];
  handleAnswerNumber: (questionId: number, selectedScore: number) => void;
  active: number;
  setSelectedQuestionIndex: Dispatch<SetStateAction<number | null>>;
}

const Card: React.FC<CardProps> = ({
  description,
  answers,
  handleAnswerNumber,
  active,
  setSelectedQuestionIndex,
}) => {
  return (
    <CardBox>
      <DescBox>
        <Paragraph>{description}</Paragraph>
      </DescBox>
      <SelectBox as='li'>
        {answers.map((answer, index) => (
          <AnswerButton
            key={index}
            id={answer.id}
            score={answer.score}
            content={answer.content}
            onClick={() => {
              handleAnswerNumber(active, answer.score);
              setSelectedQuestionIndex(active);
            }}
          />
        ))}
      </SelectBox>
    </CardBox>
  );
};

export default Card;
