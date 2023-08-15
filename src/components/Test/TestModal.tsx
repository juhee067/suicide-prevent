import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import Icon from "../common/Icon";
import { Btn, H2, Paragraph } from "../../module/styled/styledSpanagraph";
import { QuestionData } from "../../data/testData";
import { FlexColumnCenterDiv } from "../../module/styled/FlexDiv";
import Card from "./Card";

import TestContent from "./TestContent";
import ModalBackdrop from "../common/Backdrop";

const Container = styled.div``;

const ModalView = styled(FlexColumnCenterDiv)`
  padding: 100px 40px;
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  border-radius: 20px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const ContentBox = styled(FlexColumnCenterDiv)<{ active: number }>`
  gap: ${({ active }) => (active === QuestionData.length ? "0" : "30px")};
  width: 100%;
`;

const CloseModal = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 3rem;
  cursor: pointer;
`;

const Title = styled(H2)``;

const Order = styled(H2)``;

const GaugeBox = styled.div`
  width: 70%;
  height: 10px;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
`;

const GaugeBar = styled.div<GaugeBarProps>`
  width: ${({ active }) => (active + 1) * 5}%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

const ResultBox = styled(FlexColumnCenterDiv)`
  gap: 30px;
`;

const ResetButton = styled(Btn)`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
`;

interface GaugeBarProps {
  active: number;
}

interface TestModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TestModal = ({ isOpen, closeModal }: TestModalProps) => {
  const [active, setActive] = useState(0);
  const [scoreArr, setScoreArr] = useState<number[]>([]);
  const [selectedAnswerScore, setSelectedAnswerScore] = useState<number>();
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);

  if (!isOpen) {
    return null;
  }

  const handleAnswerNumber = (questionId: number, selectedScore: number) => {
    setActive(questionId + 1);
    setSelectedAnswerScore(selectedScore);
    setScoreArr((prevScoreArr) => {
      const updatedScoreArr = [...prevScoreArr];
      updatedScoreArr[questionId] = selectedScore;
      return updatedScoreArr;
    });
  };

  const resetTest = () => {
    setActive(0);
    setScoreArr([]);
    setSelectedAnswerScore(undefined);
  };

  const calculateResult = () => {
    const totalScore = scoreArr.reduce((acc, cur) => acc + cur, 0);
    return totalScore;
  };

  const handleCloseModal = () => {
    resetTest();
    closeModal();
  };
  const ScoreStandard = () => {
    const result = calculateResult();

    if (result >= 40) {
      return "높은 우울";
    } else if (result >= 21) {
      return "중증도 우울";
    } else {
      return "양호";
    }
  };

  return (
    <Container>
      <ModalView onClick={(e) => e.stopPropagation()}>
        <CloseModal onClick={handleCloseModal}>
          <AiOutlineCloseCircle />
        </CloseModal>
        <ContentBox active={active}>
          {active === QuestionData.length ? null : (
            <>
              <Title>나의 우울증 지수는?</Title>
              <GaugeBox>
                <GaugeBar active={active} />
              </GaugeBox>
            </>
          )}
          <Order>{active < 20 ? `${active + 1}/20` : null}</Order>
          <TestContent
            active={active}
            setActive={setActive}
            scoreArr={scoreArr}
            selectedAnswerScore={selectedAnswerScore}
            selectedQuestionIndex={selectedQuestionIndex}
          >
            {QuestionData.map((items, index) => (
              <Card
                key={index}
                description={items.question}
                answers={items.answers}
                handleAnswerNumber={handleAnswerNumber}
                active={active}
                setSelectedQuestionIndex={setSelectedQuestionIndex}
              />
            ))}
          </TestContent>
          {active === QuestionData.length && (
            <ResultBox>
              <H2>당신의 테스트 결과 점수는</H2>
              <H2>
                {ScoreStandard()}({calculateResult()}점)
              </H2>

              <Paragraph>하단의 설명을 확인하세요</Paragraph>
              <ResetButton onClick={resetTest}>다시 테스트하기</ResetButton>
            </ResultBox>
          )}
        </ContentBox>
      </ModalView>
      <ModalBackdrop opacityValue="80%" />
    </Container>
  );
};

export default TestModal;
