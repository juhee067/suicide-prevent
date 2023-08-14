import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import { FlexRowCenterDiv } from "../components/styled/FlexDiv";

const MainWrapper = styled.div`
  position: relative;
`;
const BlackBox = styled.div<OpacityProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #000;
  z-index: 990;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 1s ease;
`;

const MainContentBox = styled.div`
  position: relative;
  margin: 52px auto 0;
  width: 1100px;
  height: calc(100vh - 52px);
`;

const SvgBox = styled(FlexRowCenterDiv)`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 900;
`;

const SvgLeft = styled.svg`
  width: 320px;
`;

const SvgRight = styled.svg`
  width: 600px;
`;

const Defs = styled.defs``;
const Path = styled.path``;

const Text = styled.text`
  font-size: 8rem;
  letter-spacing: 0.02em;
`;
const Letter = styled(Link)`
  padding: 20px 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  border: 1px solid #000;
  border-radius: 100px;
  font-size: 2rem;
  color: #fff;
  font-weight: 500;
  background-color: #202020;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  z-index: 990;
  &:hover {
    background-color: #000000;
  }
`;
const MainBg = styled.div`
  width: 1098px;
  position: absolute;
  bottom: 0;
  border-bottom: 2px solid #000;
`;

const LeftDoor = styled.div<DoorProps>`
  position: absolute;
  left: 0;
  width: ${({ width }) => width};
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-top: 0;
  z-index: 998;
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

const RightDoor = styled.div<DoorProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ width }) => width};
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-right: none;
  border-top: 0;
  z-index: 998;
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
interface DoorProps {
  width: string;
}
interface OpacityProps {
  opacity: number;
}
const Main = () => {
  const [width, setWidth] = useState("50%");
  const [opacity, setOpacity] = useState(1);
  const [messagesCount, setMessagesCount] = useState("");

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/comments");
      setMessagesCount(response.data.length);
      console.log(response.data);
    } catch (error) {
      console.error("GET 요청 에러:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
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
      <LeftDoor width={width}>
        <LeftDoorHand />
      </LeftDoor>
      <MainContentBox>
        <SvgBox>
          <SvgLeft xmlns="http://www.w3.org/2000/svg">
            <Defs>
              <Path id="text-left" d="M 20 100 Q 100 50 320 100" />
            </Defs>

            <Text>
              <textPath href="#text-left">
                <tspan style={{ fontFamily: "DungGeunMo", fontSize: "12rem" }}>Help!</tspan>
              </textPath>
            </Text>
          </SvgLeft>
          <Img src={`${process.env.PUBLIC_URL}/images/smile.svg`} width="130px" />
          <SvgRight xmlns="http://www.w3.org/2000/svg">
            <Defs>
              <Path id="text-right" d="M 15 110 Q 100 150 550 60 " />
            </Defs>
            <Text>
              <textPath href="#text-right">
                <tspan style={{ fontFamily: "DungGeunMo", fontSize: "10rem" }}>GateKeeper</tspan>
              </textPath>
            </Text>
          </SvgRight>
        </SvgBox>

        <Letter to="/letter">{messagesCount}개의 응원의 메세지</Letter>

        <MainBg>
          <Img src={`${process.env.PUBLIC_URL}/images/mainBg.png`} />
        </MainBg>
      </MainContentBox>
      <RightDoor width={width}>
        <RightDoorHand />
      </RightDoor>
    </MainWrapper>
  );
};

export default Main;
