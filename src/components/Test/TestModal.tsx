import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import Icon from "../common/Icon";
import { Btn, Description, H2, H3, Paragraph, Subtitle } from "../styled/styledSpanagraph";
import { Question } from "../../data/testData";
import { FlexColumnCenterDiv } from "../styled/FlexDiv";
import Card from "./Card";

import TestContent from "./TestContent";

const Container = styled.div``;

const ModalBackdrop = styled(FlexColumnCenterDiv)`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const ModalView = styled(FlexColumnCenterDiv)`
  position: relative;
  padding: 100px 40px;
  border-radius: 20px;
  width: 60%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const ContentBox = styled(FlexColumnCenterDiv)<{ active: number }>`
  gap: ${({ active }) => (active === Question.length ? "0" : "30px")};
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
  useEffect(() => {
    console.log(selectedQuestionIndex);
  }, [selectedQuestionIndex]);
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

  return (
    <Container>
      <ModalBackdrop>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <CloseModal onClick={handleCloseModal}>
            <AiOutlineCloseCircle />
          </CloseModal>
          <ContentBox active={active}>
            {active === Question.length ? null : (
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
              {Question.map((items, index) => (
                <Card
                  key={index}
                  description={items.question}
                  answers={items.answers}
                  handleAnswerNumber={handleAnswerNumber}
                  active={active}
                  selectedAnswerScore={selectedAnswerScore}
                  setSelectedQuestionIndex={setSelectedQuestionIndex}
                />
              ))}
            </TestContent>
            {active === Question.length && (
              <ResultBox>
                <H2>당신의 테스트 결과 점수는</H2>
                <H3>{calculateResult()}점</H3>
                <Paragraph>하단의 설명을 확인하세요</Paragraph>
                <ResetButton onClick={resetTest}>다시 테스트하기</ResetButton>
              </ResultBox>
            )}
          </ContentBox>
        </ModalView>
      </ModalBackdrop>
    </Container>
  );
};

export default TestModal;
