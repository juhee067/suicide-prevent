import React from "react";
import styled from "styled-components";
import PostCreateForm from "../components/Post/content/PostCreateForm";

import { FlexColumnCenterDiv } from "../module/styled/FlexDiv";

const PostCreateWrapper = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

const PostCreate = () => {
  return (
    <PostCreateWrapper>
      <PostCreateForm />
    </PostCreateWrapper>
  );
};

export default PostCreate;
