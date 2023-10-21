import React from "react";
import { styled } from "styled-components";
import { FlexColumnCenterDiv } from "../../../module/styled/FlexDiv";
import EditPostForm from "./EditPostForm";

const EditPostWrapper = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

function EditPost() {
  // 게시물 편집 폼 컴포넌트로 postData를 전달하여 기본 값으로 설정
  return (
    <EditPostWrapper>
      <EditPostForm />
    </EditPostWrapper>
  );
}

export default EditPost;
