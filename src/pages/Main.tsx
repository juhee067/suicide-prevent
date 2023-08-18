import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Door from "../components/common/Door";
import { Img } from "../components/common/Img";
import { FlexColumnDiv, FlexRowDiv } from "../module/styled/FlexDiv";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const MainWrapper = styled.div`
  position: relative;
`;

const BlackBox = styled.div<OpacityProps>`
  display: ${({ opacity }) => (opacity === 0 ? "none" : "block")};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.mainBlack};
  z-index: 990;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 1s ease;
`;

const MainContentBox = styled.div`
  position: relative;
  margin: 52px auto 0;
  width: 100%;
  max-width: 1400px;
  height: calc(100vh - 52px);
  padding: 0 20px;
  box-sizing: border-box;
`;

const MainContent = styled(FlexRowDiv)`
  padding: 80px;
  position: absolute;
  top: 30%;
  left: 13%;
  transform: translateY(-50%);
`;

const TitleBox = styled(FlexColumnDiv)`
  margin-right: 50px;
  font-family: KyoboHandwriting2022khn;
  font-size: 8rem;
  font-weight: 900;
  gap: 50px;
`;

const Comment = styled.div``;

const LetterBox = styled.div`
  margin-top: 10px;
  font-family: KyoboHandwriting2022khn;
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.04rem;
  line-height: 1.2;
`;

const LetterPargraph = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.mainBlack};
`;

const PointBox = styled.div`
  margin-top: 30px;
  font-weight: 700;
`;

const LetterPargraphPoint = styled.div`
  margin-bottom: 8px;
  color: ${({ theme }) => theme.color.mainBlack};
`;

const Title = styled.div``;

const LetterBtn = styled(Link)`
  width: 43%;
  padding: 20px 25px;
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  border-radius: 100px;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.mainWhite};
  background-color: ${({ theme }) => theme.color.mainBlack};
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  z-index: 990;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  @media screen and (max-width: 768px) {
    width: 35%;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 540px) {
    width: 45%;
  }
  @media screen and (max-width: 375px) {
    width: 50%;
    font-size: 1.5rem;
  }
`;

const MainBg = styled.div`
  width: 80%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
  z-index: 900;
`;

interface OpacityProps {
  opacity: number;
}

const Main = () => {
  const [width, setWidth] = useState("50%");
  const [opacity, setOpacity] = useState(1);
  const [messagesCount, setMessagesCount] = useState(0);

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");

    const fetchMessagesCount = async () => {
      try {
        // 메시지 데이터를 가져오는 로직
        const data = await getDocs(usersCollectionRef);

        // 메시지 갯수 업데이트
        setMessagesCount(data.docs.length);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessagesCount();
  }, []);

  const updateWidth = () => {
    setWidth("15%");
  };

  const updateOpacity = () => {
    setOpacity(0);
  };

  useEffect(() => {
    // 1초 후에 updateWidth 함수 실행
    const timer = setTimeout(() => {
      updateWidth();
      updateOpacity();
    }, 200);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, []);

  return (
    <MainWrapper>
      <BlackBox opacity={opacity} />
      <Door width={width} />
      <MainContentBox>
        <MainContent>
          <TitleBox>
            <Comment>
              <Title>Hello!-Help!</Title>
              <Title>GateKeeper</Title>
            </Comment>
            <LetterBtn to="/letter">{messagesCount}개의 응원메세지</LetterBtn>
          </TitleBox>
          <LetterBox>
            <LetterPargraph>오늘도 어김없이 하루가 밝아왔네요.</LetterPargraph>
            <LetterPargraph>세상은 해가 뜨기 전 새벽이 가장 어두운 시간이죠.</LetterPargraph>
            <LetterPargraph>아쉽게도 현실은 당신의 기대를 저버린 채 있지만,</LetterPargraph>
            <LetterPargraph>아직 당신이 닿지 못한 무수한 희망과 기쁨이 존재할 거예요</LetterPargraph>

            <PointBox>
              <LetterPargraphPoint>
                그리고 눈 앞에 어둠이 잠시나마 걷힐 틈새가 보일 거예요.
              </LetterPargraphPoint>
              <LetterPargraphPoint>
                그 순간에는 여느 때보다 더 환한 햇살이 당신을 비춰줄 거에요.
              </LetterPargraphPoint>
            </PointBox>
          </LetterBox>
        </MainContent>
        <MainBg>
          <Img src={`${process.env.PUBLIC_URL}/images/mainBg.png`} />
        </MainBg>
      </MainContentBox>
    </MainWrapper>
  );
};

export default Main;
