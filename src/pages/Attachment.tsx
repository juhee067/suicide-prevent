import { FlexColumnCenterDiv, FlexColumnDiv } from "../components/styled/FlexDiv";
import React from "react";
import styled from "styled-components";
import FileAttachment from "../components/attachment/FileAttachment";

const AttachmentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
  text-align: center;
`;
const AttachmentBox = styled.div``;

const TitleBox = styled(FlexColumnDiv)`
  margin-bottom: 20px;
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
