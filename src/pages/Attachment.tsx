import { FlexColumnDiv } from "../components/styled/FlexDiv";
import React from "react";
import styled from "styled-components";
import FileAttachment from "../components/attachment/FileAttachment";

const AttachmentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  text-align: center;
`;

const AttachmentBox = styled.div`
  margin: 0 auto;
  width: 500px;
`;

const TitleBox = styled(FlexColumnDiv)`
  line-height: 1.5;
`;

const Attachment = () => {
  return (
    <AttachmentWrapper>
      <AttachmentBox>
        <TitleBox />
        <FileAttachment />
      </AttachmentBox>
    </AttachmentWrapper>
  );
};

export default Attachment;
