import React from "react";
import styled from "styled-components";
import { CenterAlign } from "../components/styled/CenterAlignment";
import { H3 } from "../components/styled/styledSpanagraph";

const SnapBox = styled(CenterAlign)``;

const Snap = () => {
  return (
    <SnapBox>
      <H3>곰곰히 생각해보자 당장 당신에게 내일이 의미가 있는가</H3>
    </SnapBox>
  );
};

export default Snap;
