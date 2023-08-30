import React, { useState } from "react";
import styled from "styled-components";
import Door from "../components/common/Door";
import { Img } from "../components/common/Img";
import { FlexColumnCenterDiv } from "../module/styled/FlexDiv";
import { Btn, H2, Paragraph } from "../module/styled/styledSpanagraph";
import TestModal from "../components/Test/TestModal";
import ScrollIndicator from "../components/common/ScrollIndicator";

const TestMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const TestMainSection = styled.div`
  padding: 0 20px;
  width: 100%;
  max-width: 1200px;
  position: relative;
  margin: 52px 0 0;
`;

const Container = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  height: calc(100vh - 52px);
  gap: 30px;
  @media screen and (max-width: 480px) {
    height: 600px;
  }
`;

const TestTitle = styled(H2)`
  padding: 5px 0;
  background-color: ${({ theme }) => theme.color.mainWhite};
  @media screen and (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const ContentBox = styled.div`
  letter-spacing: 0.05em;
  line-height: 1.5;
`;

const Content = styled(Paragraph)`
  background-color: ${({ theme }) => theme.color.mainWhite};
  @media screen and (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const ImgBox = styled.div`
  width: 305px;
  height: 305px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 480px) {
    margin: 10px auto;
    width: 205px;
    height: 205px;
  }
`;
const IndicatorBox = styled.div``;

const TestBtn = styled(Btn)`
  padding: 15px 50px;
  margin-bottom: 50px;
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

  @media screen and (max-width: 480px) {
    margin-bottom: 30px;
    padding: 12px 20px;
    width: 120px;
    font-size: 1.2rem;
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
    <TestMainWrapper>
      {/* <Door width="auto" side="left" /> */}
      <TestMainSection>
        <Container>
          <TestModal closeModal={closeModal} isOpen={isOpen} />
          <TestTitle>나 자신을 스스로 드러내다</TestTitle>
          <ContentBox>
            <Content>우울증 예방 또는 극복을 위하여 자기 자신의 상태를 </Content>
            <Content> 먼저 아는 노력이 무엇보다 가장 중요합니다</Content>
          </ContentBox>
          <ImgBox>
            <Img src={`${process.env.PUBLIC_URL}/images/testAi.png`} />
          </ImgBox>
          <IndicatorBox>
            <TestBtn onClick={openModal}>진단하기</TestBtn>
            <ScrollIndicator onClick={() => onMoveToFunctionCard()}>하단 설명보기</ScrollIndicator>
          </IndicatorBox>
        </Container>
      </TestMainSection>
      {/* <Door width="auto" side="right" /> */}
    </TestMainWrapper>
  );
};

export default TestMain;
