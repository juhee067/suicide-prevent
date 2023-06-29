import React from "react";
import styled from "styled-components";
import { FlexCenterDiv, FlexColumnCenterDiv } from "./styled/FlexDiv";
import { Btn, ErrorText, H3, HighlightText, Paragraph } from "./styled/styledSpanagraph";
import { AiFillFileAdd } from "react-icons/ai";

const FileAttachmentWrap = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const FileAttachmentBox = styled.div`
  border: 1px solid #000;
  margin-bottom: 30px;
`;

const RequestBox = styled(Paragraph)`
  padding: 20px 20px;
  color: ${({ theme }) => theme.color.mainWhite};
  background-color: ${({ theme }) => theme.color.mainBlack};
`;

const DragBox = styled(FlexColumnCenterDiv)`
  padding: 0 20px;
  gap: 30px;
  height: 400px;
  line-height: 1.5;
`;

const Icon = styled.div`
  font-size: 5em;
`;

const ButtonBox = styled(FlexCenterDiv)`
  justify-content: space-between;
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

const FileAttachment = () => {
  return (
    <FileAttachmentWrap>
      <FileAttachmentBox>
        <RequestBox>자신이 좋아하는 사진 6장을 첨부해주세요</RequestBox>
        <DragBox>
          <Icon>
            <AiFillFileAdd />
          </Icon>
          <Paragraph>
            파일을 드래그하여 여기에 끌어 놓거나
            <HighlightText showUnderline={true}>첨부하기</HighlightText> 버튼을 클릭하세요
          </Paragraph>
          <ErrorText>* 파일을 첨부하지 않으면 이미지가 나오지 않습니다</ErrorText>
        </DragBox>
      </FileAttachmentBox>
      <ButtonBox>
        <UploadBtn>Upload</UploadBtn>
        <SkipBtn>Skip</SkipBtn>
      </ButtonBox>
    </FileAttachmentWrap>
  );
};

export default FileAttachment;
