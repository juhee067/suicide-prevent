import React from "react";
import styled from "styled-components";
import BoardForm from "../components/Post/BoardForm";
import { FlexColumnCenterDiv } from "../module/styled/FlexDiv";

const BoardFormWrapper = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

const BoardWriting = () => {
  return (
    <BoardFormWrapper>
      <BoardForm />
    </BoardFormWrapper>
  );
};

export default BoardWriting;
