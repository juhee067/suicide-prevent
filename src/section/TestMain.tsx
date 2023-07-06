import React, { useState } from "react";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import { FlexColumnCenterDiv } from "../components/styled/FlexDiv";
import { Btn, H2, Paragraph } from "../components/styled/styledSpanagraph";
import TestModal from "../components/Test/TestModal";

const TestMainSection = styled.div``;

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
  cursor: pointer;
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
      <ScrollDown>Scroll down</ScrollDown>
    </TestMainSection>
  );
};

export default TestMain;
