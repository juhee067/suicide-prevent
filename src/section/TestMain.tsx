import React, { useState } from "react";
import styled from "styled-components";
import Door from "../components/common/Door";
import { Img } from "../components/common/Img";
import { FlexColumnCenterDiv } from "../components/styled/FlexDiv";
import { Btn, H2, Paragraph } from "../components/styled/styledSpanagraph";
import TestModal from "../components/Test/TestModal";

const TestMainSection = styled.div`
  position: relative;
  margin: 52px auto 0;
  height: calc(100vh - 52px);
  border-bottom: 2px solid #000;
`;

const Container = styled(FlexColumnCenterDiv)`
  gap: 30px;
  height: 100vh;
`;

const TestTitle = styled(H2)`
  padding: 5px 0;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const ContentBox = styled.div`
  letter-spacing: 0.05em;
  line-height: 1.5;
`;

const Content = styled(Paragraph)`
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const ScrollDown = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 369px;
  height: 404px;
`;

const TestBtn = styled(Btn)`
  padding: 15px 50px;
  width: 200px;
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  background-color: ${({ theme }) => theme.color.mainWhite};
  color: #fff;
  font-weight: 500;
  background-color: #202020;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 100px;
  &:hover {
    background-color: #000000;
  }
`;

const LeftDoor = styled.div`
  position: absolute;
  left: 0;
  width: 15%;
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-top: 0;
  z-index: 900;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
const LeftDoorHand = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: #474747;
  border: 1px solid #000;
  border-radius: 10px;
`;

const RightDoor = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 15%;
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-right: none;
  border-top: 0;
  z-index: 900;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
const RightDoorHand = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: #474747;
  border-radius: 10px;
`;

const TestMain = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <TestMainSection>
      <Door width="15%" />
      <Container>
        {/* {isOpen ? <TestModal /> : null} */}
        <TestModal closeModal={closeModal} isOpen={isOpen} />
        <TestTitle>나 자신을 스스로 드러내다</TestTitle>
        <ContentBox>
          <Content>우울증 예방 또는 극복을 위하여 자기 자신의 상태를 </Content>
          <Content> 먼저 아는 노력이 무엇보다 가장 중요합니다</Content>
        </ContentBox>
        <ImgBox>
          <Img src={`${process.env.PUBLIC_URL}/images/testAi.png`} width="70%" height="70%" />
        </ImgBox>
        <TestBtn onClick={openModal}>진단하기</TestBtn>
      </Container>
      <ScrollDown>Scroll Down</ScrollDown>
    </TestMainSection>
  );
};

export default TestMain;
