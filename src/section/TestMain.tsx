import React, { useState } from "react";
import styled from "styled-components";
import Door from "../components/common/Door";
import { Img } from "../components/common/Img";
import { FlexColumnCenterDiv } from "../module/styled/FlexDiv";
import { Btn, H2, Paragraph } from "../module/styled/styledSpanagraph";
import TestModal from "../components/Test/TestModal";
import ScrollIndicator from "../components/common/ScrollIndicator";

const TestMainSection = styled.div`
  position: relative;
  margin: 52px auto 0;
  height: calc(100vh - 52px);
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const Container = styled(FlexColumnCenterDiv)`
  height: calc(100vh - 52px);
  gap: 30px;
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

const ScrollDownBox = styled.div`
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
  color: ${({ theme }) => theme.color.mainWhite};
  font-weight: 500;
  background-color: ${({ theme }) => theme.color.mainBlack};
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  border-radius: 100px;
  &:hover {
    background-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

interface TestMainProps {
  onMoveToFunctionCard: () => void;
}
const TestMain = ({ onMoveToFunctionCard }: TestMainProps) => {
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
        <TestModal closeModal={closeModal} isOpen={isOpen} />
        <TestTitle>나 자신을 스스로 드러내다</TestTitle>
        <ContentBox>
          <Content>우울증 예방 또는 극복을 위하여 자기 자신의 상태를 </Content>
          <Content> 먼저 아는 노력이 무엇보다 가장 중요합니다</Content>
        </ContentBox>
        <ImgBox>
          <Img src={`${process.env.PUBLIC_URL}/images/testAi.png`} width="90%" height="90%" />
        </ImgBox>
        <TestBtn onClick={openModal}>진단하기</TestBtn>{" "}
        <ScrollIndicator onClick={() => onMoveToFunctionCard()}>하단 설명보기</ScrollIndicator>
      </Container>
    </TestMainSection>
  );
};

export default TestMain;
