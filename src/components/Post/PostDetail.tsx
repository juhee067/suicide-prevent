import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FlexColumnCenterDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption, Description, Subtitle } from "../../module/styled/styledFont";
import Comment from "./Comment";

// 가상 데이터: 게시글 내용
const postContent = {
  id: 1,
  title: "게시글 제목 1",
  content: "게시글 내용 1. 이 부분은 실제 게시물 내용입니다. 심플하게 보여줍니다.",
  author: "배영은",
  comments: 5,
  postTime: "2023.09.24",
  previewImage: "미리보기 이미지 텍스트", // 미리보기 이미지 대체 텍스트
};

// 스타일드 컴포넌트를 사용하여 상세보기 스타일을 정의합니다.
const CenteredContainer = styled(FlexColumnCenterDiv)`
  margin: 0 auto;
  min-height: 100vh;
  padding: 100px 0;
  background-color: #e9e9e9;
`;

const DetailContainer = styled.div`
  width: 50%;
  max-width: 1200px;
  padding: 20px;
  text-align: left;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PostHeaderBox = styled(FlexRowDiv)`
  justify-content: space-between;
  align-items: center;
`;

const WritingBox = styled(FlexRowDiv)`
  justify-content: space-between;
  align-items: end;
  gap: 20px;
`;

const PostTitle = styled.h1`
  font-size: 24px;
  margin: 0;
`;
const PostTime = styled(Caption)`
  color: ${({ theme }) => theme.color.mainGray};
`;
const PostAuthor = styled(Subtitle)``;

const PostContent = styled(Description)`
  margin-bottom: 20px;
`;

const PostContentBox = styled.div`
  margin: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color.mainBlack};
  border-bottom: 1px solid ${({ theme }) => theme.color.mainBlack};
`;

const PreviewImage = styled.div`
  width: 100%;
  height: 200px;

  text-align: center;
  line-height: 200px;
  font-size: 20px;
`;

const CommentBox = styled.div``;

const CommentCount = styled(Caption)``;

function PostDetail() {
  const { id } = useParams();
  return (
    <CenteredContainer>
      <DetailContainer>
        <PostHeaderBox>
          <WritingBox>
            <PostTitle>{postContent.title}</PostTitle>
            <PostTime>{postContent.postTime}</PostTime>
          </WritingBox>

          <PostAuthor>{postContent.author}</PostAuthor>
        </PostHeaderBox>
        <PostContentBox>
          <PreviewImage>{postContent.previewImage}</PreviewImage>
          <PostContent>{postContent.content}</PostContent>
        </PostContentBox>

        <CommentBox>
          <CommentCount>댓글 수: {postContent.comments}</CommentCount>
          <Comment />
        </CommentBox>
      </DetailContainer>
    </CenteredContainer>
  );
}

export default PostDetail;
