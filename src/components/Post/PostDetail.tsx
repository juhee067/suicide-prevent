import React from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption, Description, Subtitle } from "../../module/styled/styledFont";

// 가상 데이터: 게시글 내용
const postContent = {
  id: 1,
  title: "게시글 제목 1",
  content: "게시글 내용 1. 이 부분은 실제 게시물 내용입니다. 심플하게 보여줍니다.",
  author: "김세돌",
  comments: 5,
  postTime: "3일 전",
  previewImage: "미리보기 이미지 텍스트", // 미리보기 이미지 대체 텍스트
};

// 스타일드 컴포넌트를 사용하여 상세보기 스타일을 정의합니다.
const CenteredContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 0;
`;

const DetailContainer = styled.div`
  width: 70%;
  padding: 20px;
  text-align: left;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const PostHeader = styled(FlexRowDiv)`
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const PostAuthor = styled(Subtitle)``;

const PostContent = styled(Description)`
  margin-bottom: 20px;
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 200px;
  font-size: 20px;
`;

const CommentCount = styled(Caption)``;

const PostTime = styled(Caption)``;

function PostDetail() {
  return (
    <CenteredContainer>
      <DetailContainer>
        <PostHeader>
          <PostTitle>{postContent.title}</PostTitle>
          <PostAuthor>{postContent.author}</PostAuthor>
        </PostHeader>
        <PreviewImage>{postContent.previewImage}</PreviewImage>
        <PostContent>{postContent.content}</PostContent>
        <CommentCount>댓글 수: {postContent.comments}</CommentCount>
        <PostTime>{postContent.postTime}</PostTime>
      </DetailContainer>
    </CenteredContainer>
  );
}

export default PostDetail;
