import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexCenterDiv } from "../styled/FlexDiv";
import { Btn, Paragraph } from "../styled/styledSpanagraph";
import FileDragAttachment from "./FileDragAttachment";
import FileList from "./FileList";

const FileAttachmentWrap = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const FileAttachmentBox = styled.div`
  border: 1px solid #000;
  margin-bottom: 10px;
`;

const RequestBox = styled(Paragraph)`
  padding: 20px 20px;
  color: ${({ theme }) => theme.color.mainWhite};
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

const UploadBtn = styled(Btn)`
  width: 63%;
  color: ${({ theme }) => theme.color.mainWhite};
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

const SkipBtn = styled(Btn)`
  width: 32%;
  color: ${({ theme }) => theme.color.mainBlack};
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const ButtonBox = styled(FlexCenterDiv)`
  justify-content: space-between;
  cursor: pointer;
  margin-top: 30px;
`;

const FileAttachment = () => {
  return (
    <FileAttachmentWrap>
      <FileAttachmentBox>
        <RequestBox>오늘이 인생의 마지막 날 이라면 지금 하고 있는 일을 할 것인가</RequestBox>
        <FileDragAttachment />
      </FileAttachmentBox>
      <FileList />
      <ButtonBox>
        <UploadBtn>
          <Link to="/snap">Upload</Link>
        </UploadBtn>
        <SkipBtn>
          <Link to="/main">Skip</Link>
        </SkipBtn>
      </ButtonBox>
    </FileAttachmentWrap>
  );
};

export default FileAttachment;
