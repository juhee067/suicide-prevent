import React from "react";
import styled from "styled-components";
import PostList from "../components/Post/content/PostList";

const Post = () => {
  const PostWrapper = styled.div`
    height: 100vh;
    background-color: #e9e9e9;
  `;

  return (
    <PostWrapper>
      <PostList />
    </PostWrapper>
  );
};

export default Post;
