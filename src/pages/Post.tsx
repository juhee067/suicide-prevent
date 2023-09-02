import React from "react";
import styled from "styled-components";
import PostDetail from "../components/Post/PostDetail";
import PostList from "../components/Post/PostList";

const Post = () => {
  const PostWrapper = styled.div`
    height: 100vh;
    background-color: #e9e9e9;
  `;

  return (
    <PostWrapper>
      {/* <PostList /> */}
      <PostDetail />
    </PostWrapper>
  );
};

export default Post;
