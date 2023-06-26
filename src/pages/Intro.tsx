import { FlexColumnCenterDiv, FlexColumnDiv } from "../components/styled/FlexDiv";
import React from "react";
import styled from "styled-components";
import FileAttachment from "../components/FileAttachment";
import { H3 } from "../components/styled/styledSpanagraph";
import { CenterAlign } from "../components/styled/CenterAlignment";

const TitleBox = styled(FlexColumnDiv)`
  margin-bottom: 20px;
  line-height: 1.5;
`;

const Intro = () => {
  return (
    <CenterAlign>
      <FlexColumnCenterDiv>
        <TitleBox>
          <H3>오늘이 인생의</H3>
          <H3>마지막 날 이라면 지금 하고 있는 일을 할 것인가</H3>
        </TitleBox>
        <FileAttachment />
      </FlexColumnCenterDiv>
    </CenterAlign>
  );
};

export default Intro;
