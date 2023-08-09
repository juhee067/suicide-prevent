import React from "react";
import styled from "styled-components";
import { FlexColumnDiv, FlexRowDiv } from "../components/styled/FlexDiv";
import {
  Description,
  H2,
  HighlightText,
  Paragraph,
  Subtitle,
} from "../components/styled/styledSpanagraph";

const Wrapper = styled(FlexColumnDiv)`
  padding: 100px 0;
  justify-content: space-between;
  height: 100vh;
  letter-spacing: 0.0125em;
`;

const QuestWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`;

const QuestBox = styled(FlexRowDiv)`
  justify-content: space-between;
`;

const ContentBox = styled(FlexColumnDiv)`
  gap: 15px;

  > :first-child {
    margin-bottom: 20px;
  }
`;

const Content = styled(Paragraph)`
  font-size: 1.8rem;
`;

const ResultWrapper = styled.div`
  width: 100%;
  border-top: 2px solid ${({ theme }) => theme.color.mainBlack};
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const ResultBox = styled(FlexRowDiv)`
  flex-wrap: wrap;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`;

const ResultContent = styled(FlexColumnDiv)`
  padding: 20px;
  width: 30%;
  height: 400px;
  justify-content: space-between;
  border-left: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const Result = styled.div``;

const Score = styled(H2)`
  font-weight: 900;
`;

const Title = styled(HighlightText)`
  font-weight: 400;
  margin-top: 20px;
`;

const Des = styled(Description)`
  line-height: 1.3;
  word-break: keep-all;
`;

type Data = {
  id: number;
  score: string;
  title: string;
  des: string;
};
const testResultData: Data[] = [
  {
    id: 0,
    score: "16점 이하",
    title: "없음",
    des: "유의한 수준의 우울감이 시사되지 않습니다.",
  },
  {
    id: 1,
    score: "21 - 40점",
    title: "중증도 우울",
    des: "중간정도 수준의 우울감이 시사됩니다. 이러한 수준의 우울감은 흔히 신체적, 심리적 대처자원을 저하시키며 개인의 일상생활을 어렵게 만들기도 합니다. 전문가와 상담을 통하여 보다 상세한 평가와 도움을 받아보시기 바랍니다.",
  },

  {
    id: 2,
    score: "40 - 60점",
    title: "높은 우울",
    des: "심한 수준의 우울감이 시사됩니다. 전문가의 치료적 개입과 평가가 요구됩니다.",
  },
];
const TestResult = () => {
  return (
    <Wrapper>
      <QuestWrapper>
        <QuestBox>
          <H2>많이 힘들었을 당신은 지금,</H2>
          <ContentBox>
            <Subtitle>우울증 자가진단 테스트 후에 복잡한 생각이 든다면 지금,</Subtitle>
            <Content>오늘만큼은 내가 좋아하는 일 혹은 내 마음의 에너지를 채울 수 있는 일들로 </Content>
            <Content>쉬어가는 시간을 가지는 건 어떨까요?</Content>
          </ContentBox>
        </QuestBox>
      </QuestWrapper>
      <ResultWrapper>
        <ResultBox>
          {testResultData.map((data, index) => {
            return (
              <ResultContent key={index}>
                <Result>
                  <Score>{data.score}</Score>
                  <Title>{data.title}</Title>
                </Result>
                <Des>{data.des}</Des>
              </ResultContent>
            );
          })}
        </ResultBox>
      </ResultWrapper>
    </Wrapper>
  );
};

export default TestResult;
