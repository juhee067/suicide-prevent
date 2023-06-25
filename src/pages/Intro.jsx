import React from "react";
import styled from "styled-components";
import FileAttachment from "../components/FileAttachment";
const Pharse = styled.div`
  margin-bottom: 30px;
`;
const Intro = () => {
  return (
    <div>
      <Pharse>오늘이 인생의 마지막 날 이라면 지금 하고 있는 일을 할 것인가</Pharse>
      <FileAttachment />
    </div>
  );
};

export default Intro;
