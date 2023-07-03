import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import PhotoCard from "../components/snap/PhotoCard";
import { CenterAlign } from "../components/styled/CenterAlignment";
import { H3 } from "../components/styled/styledSpanagraph";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import Icon from "../components/common/Icon";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const SnapBox = styled(CenterAlign)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: #fff;
`;

const Snap = () => {
  return (
    <>
      <GlobalStyle />
      <SnapBox>
        <Icon fontSize="5rem">
          <BsFillArrowRightCircleFill />
        </Icon>
        <H3>곰곰히 생각해보자 당장 당신에게 내일이 의미가 있는가</H3>
      </SnapBox>
      <PhotoCard />
    </>
  );
};

export default Snap;
