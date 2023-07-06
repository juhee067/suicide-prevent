import React, { createRef, useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import styled from "styled-components";
import Icon from "../common/Icon";
import { Btn, H2, Paragraph } from "../styled/styledSpanagraph";
import { Question } from "../../data/testData";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalView = styled.div`
  padding: 30px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  width: 60%;
  height: 70%;
  background-color: #ffffff;
`;
const CloseModal = styled(Icon)`
  position: absolute;
  top: 5px;
  right: 5px;
  font-size: 3rem;
  cursor: pointer;
`;
const GaugeBox = styled.div`
  margin: 40px 0;
  width: 80%;
  height: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.mainGray};
`;
const DescBox = styled.div`
  margin-bottom: 30px;
  width: 60%;
  height: 30%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
`;
const SelectBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  > * {
    width: 40%;
    border: 1px solid ${({ theme }) => theme.color.mainGray};
    border-radius: 30px;
  }
`;

interface TestModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const TestModal = ({ isOpen, closeModal }: TestModalProps) => {
  const [questNum, setQuestNum] = useState(0);
  // questNum: 현재 질문 인덱스를 관리하는 상태 변수입니다. 초기값은 0으로 설정
  const [currentSlide, setCurrentSlide] = useState(1);

  const slideRef = createRef();
  const TOTAL_SLIDES = 20;
  const [test, setTest] = useState([]);
  // 사용자의 선택한 test 결과를 저장하는 배열 상태 변수입니다. 초기값은 []으로 설정
  if (!isOpen) {
    return null;
  }

  // const nextSlide = (optionIndex: number) => {
  //   setTest(test + Question[questNum].answers[optionIndex].score);
  //   setQuestNum(questNum + 1);
  //   setCurrentSlide(currentSlide + 1);

  //   slideRef.current.style.transform += "translateX(-100vw)";
  // };

  // const nextSlideFir = () => {
  //   nextSlide(0); // 첫 번째 옵션 선택
  // };

  // const nextSlideSec = () => {
  //   nextSlide(1); // 두 번째 옵션 선택
  // };

  return (
    <Container>
      <ModalBackdrop>
        <ModalView
          onClick={(e) => e.stopPropagation()}
          // ref={slideRef}
        >
          <CloseModal onClick={closeModal}>
            <AiOutlineCloseCircle />
          </CloseModal>
          <H2>나의 우울증 지수는?</H2>
          <GaugeBox></GaugeBox>
          {Question.map((item) => {
            return (
              <>
                <DescBox>
                  <Paragraph></Paragraph>
                </DescBox>
                <SelectBox>
                  <Btn>01</Btn>
                  <Btn>02</Btn>
                  <Btn>03</Btn>
                  <Btn>04</Btn>
                </SelectBox>
              </>
            );
          })}
        </ModalView>
      </ModalBackdrop>
    </Container>
  );
};

export default TestModal;
