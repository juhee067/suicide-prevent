import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FlexColumnCenterDiv } from "../module/styled/FlexDiv";
import CommentView from "../components/Post/CommentView";
import PostView from "../components/Post/PostView";
import { Btn } from "../module/styled/styledFont";
import { Link } from "react-router-dom";

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
  margin-bottom: 20px;
  padding: 20px;
  text-align: left;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ListBtn = styled(Btn)``;

function PostDetail() {
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출

  return (
    <CenteredContainer>
      <DetailContainer>
        <PostView postId={postId} />
        <CommentView postId={postId} />
      </DetailContainer>
      <ListBtn>
        <Link to="/post"> 목록으로</Link>
      </ListBtn>
    </CenteredContainer>
  );
}

export default PostDetail;
