import React from "react";
import styled, { keyframes } from "styled-components";
import { MutedText, Paragraph } from "../components/styled/styledSpanagraph";
import { FlexColumnDiv } from "../components/styled/FlexDiv";
import { Link } from "react-router-dom";

const Intro = () => {
  const Body = styled.div``;

  const moveUpDown = keyframes`
0% {
  transform: translateY(0);
}
50% {
  transform: translateY(30px);
}
100% {
  transform: translateY(0);
}
`;

  const shadowMoveUpDown = keyframes`
0% {
  transform: scale(1);
}
50% {
  transform: scale(0.5);
}
100% {
  transform: scale(1);
}
`;

  const AnimatedMail = styled.div`
    position: absolute;
    height: 150px;
    width: 200px;
    transition: 0.4s;
    animation: ${moveUpDown} 2s linear infinite;
    ${Body} {
      position: absolute;
      bottom: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 0 100px 200px;
      border-color: transparent transparent ${({ theme }) => theme.color.TopFold} transparent;
      z-index: 2;
    }
  `;

  const TopFold = styled.div`
    position: absolute;
    top: 50px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 100px 0 100px;
    transform-origin: 50% 0%;
    transition: transform 0.4s 0.4s, z-index 0.2s 0.4s;
    border-color: ${({ theme }) => theme.color.mainBlack}; transparent transparent transparent;
    z-index: 2;
  `;

  const BackFold = styled.div`
    position: absolute;
    bottom: 0;
    width: 200px;
    height: 100px;
    background: ${({ theme }) => theme.color.mainBlack};
    z-index: 0;
  `;

  const LeftFold = styled.div`
    position: absolute;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 50px 0 50px 100px;
    border-color: transparent transparent transparent ${({ theme }) => theme.color.LeftFold};
    z-index: 2;
  `;

  const Letter = styled(FlexColumnDiv)`
    gap: 5px;
    position: absolute;
    left: 20px;
    bottom: 0px;
    padding: 20px;
    width: 160px;
    height: 60px;
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
    background-color: #fff;
    z-index: 1;
    overflow: hidden;
    transition: 0.4s 0.2s;
    text-align: center;
  `;

  const LetterStampInner = styled.div``;

  const Shadow = styled.div`
    position: absolute;
    top: 200px;
    left: -50%;
    width: 400px;
    height: 30px;
    transition: 0.4s;
    transform: translateX(-50%);
    border-radius: 100%;
    background: radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0));
    animation: ${shadowMoveUpDown} 2s linear infinite;
  `;

  const LetterImage = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    &:hover {
      ${AnimatedMail} {
        transform: translateY(50px);
      }

      ${TopFold} {
        transition: transform 0.4s, z-index 0.2s;
        transform: rotateX(180deg);
        z-index: 0;
      }
      ${Letter} {
        height: 180px;
      }
    }
  `;

  const ClickText = styled(MutedText)`
    margin-bottom: 5px;
    color: ${({ theme }) => theme.color.mainGray};
    text-decoration: underline;
  `;

  return (
    <LetterImage>
      <AnimatedMail>
        <BackFold></BackFold>
        <Link to="/attachment">
          <Letter>
            <ClickText>Click !</ClickText>
            <Paragraph>오늘이</Paragraph>
            <Paragraph>마지막 날 이라면 </Paragraph>
            <Paragraph>지금 하는 일을 </Paragraph>
            <Paragraph>할 것인가</Paragraph>
          </Letter>
        </Link>

        <TopFold></TopFold>
        <Body></Body>
        <LeftFold></LeftFold>
      </AnimatedMail>
      <Shadow></Shadow>
    </LetterImage>
  );
};

export default Intro;
