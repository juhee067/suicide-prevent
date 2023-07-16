import React from "react";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import { FlexRowCenterDiv } from "../components/styled/FlexDiv";

const MainWrapper = styled.div``;

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
const MainBg = styled.div`
  position: absolute;
  bottom: 0;
`;

const Main = () => {
  return (
    <MainWrapper>
      <SvgBox>
        <SvgLeft xmlns="http://www.w3.org/2000/svg">
          <Defs>
            <Path id="text-left" d="M 20 100 Q 100 50 320 100" />
          </Defs>

          <Text>
            <textPath href="#text-left">
              H<tspan style={{ fontFamily: "DungGeunMo", fontSize: "12rem" }}>e</tspan>lp
              <tspan style={{ fontFamily: "DungGeunMo", fontSize: "12rem" }}>!</tspan>
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
              <tspan style={{ fontFamily: "DungGeunMo", fontSize: "10rem" }}>Gate</tspan> Keep
              <tspan style={{ fontFamily: "DungGeunMo", fontSize: "10rem" }}>er</tspan>
            </textPath>
          </Text>
        </SvgRight>
      </SvgBox>

      <MainBg>
        <Img src={`${process.env.PUBLIC_URL}/images/mainBg.png`} />
      </MainBg>
    </MainWrapper>
  );
};

export default Main;
