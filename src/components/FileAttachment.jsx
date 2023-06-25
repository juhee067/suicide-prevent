import React from "react";
import styled from "styled-components";
import { AiFillFileAdd } from "react-icons/ai";
const FileAttachmentWrap = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 500px;
`;
const FileAttachmentBox = styled.div`
  width: 100%;
  border: 1px solid #000;
  margin-bottom: 30px;
`;
const RequestBox = styled.div`
  padding: 20px 0;
  color: #fff;
  background-color: #000;
`;
const DragBox = styled.div`
  height: 400px;
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  > * {
    padding: 10px 0;
    width: 200px;
  }
`;
const Upload = styled.div`
  color: #fff;
  background-color: #000;
`;
const Skip = styled.div`
  color: #000;
  border: 1px solid #000;
`;
const FileAttachment = () => {
  return (
    <FileAttachmentWrap>
      <FileAttachmentBox>
        <RequestBox>자신이 좋아하는 사진 6장을 첨부해주세요</RequestBox>
        <DragBox>
          <AiFillFileAdd />
          <p>
            파일을 드래그하여 여기에 끌어 놓거나 <span>첨부하기</span> 버튼을 클릭하세요
          </p>
          <p>* 파일을 첨부하지 않으면 이미지가 나오지 않습니다</p>
        </DragBox>
      </FileAttachmentBox>
      <Button>
        <Upload>Upload</Upload>
        <Skip>Skip</Skip>
      </Button>
    </FileAttachmentWrap>
  );
};

export default FileAttachment;
