import React, { useState } from 'react';
import styled from 'styled-components';
import Door from '../components/common/Door';
import { Img } from '../components/common/Img';
import { FlexColumnCenterDiv } from '../module/styled/FlexDiv';
import { Btn, H2, Paragraph, Title } from '../module/styled/styledFont';
import TestModal from '../components/Test/TestModal';
import ScrollIndicator from '../components/common/ScrollIndicator';

const TestMainWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const TestMainSection = styled.div`
  width: 100%;
  max-width: 1200px;
  position: relative;
  padding: 152px 20px 100px;
  @media screen and (max-width: 1440px) {
    padding: 100px 20px 50px;
  }
  @media screen and (max-width: 768px) {
    padding: 120px 20px 30px;
  }
  @media screen and (max-width: 375px) {
    padding: 20px;
  }
  @media screen and (max-width: 320px) {
    padding: 0;
  }
`;

const Container = styled(FlexColumnCenterDiv)`
  font-family: KyoboHandwriting2022khn;
  gap: 30px;
  @media screen and (max-width: 480px) {
    height: 600px;
  }
`;

const TestTitle = styled(Title)``;

const ContentBox = styled.div`
  letter-spacing: 0.05em;
  line-height: 1.5;
`;

const Content = styled(Paragraph)``;

const ImgBox = styled.div`
  width: 305px;
  height: 305px;

  @media screen and (max-width: 768px) {
    width: 205px;
    height: 205px;
  }
`;
const IndicatorBox = styled.div``;

const TestBtn = styled(Btn)`
  margin-bottom: 50px;
  @media screen and (max-width: 768px) {
    margin-bottom: 30px;
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
