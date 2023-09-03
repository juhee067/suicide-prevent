import { collection, doc, DocumentData, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { FlexColumnCenterDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { Btn, Caption, Description, Subtitle } from "../../module/styled/styledFont";
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
  height: 100px;
  margin: 20px;
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

const CommentForm = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
`;

const CommentInput = styled.textarea`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const CommentSubmitButton = styled.button`
  padding: 16px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ theme }) => theme.color.mainBlack};
  color: ${({ theme }) => theme.color.mainWhite};
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
`;

const CommentBox = styled.div``;

const CommentCount = styled(Caption)``;

function PostDetail() {
  const { postId } = useParams(); // URL 파라미터에서 게시물 ID를 추출
  const [detailPost, setDetailPost] = useState<DocumentData | null>(null);

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }

    // 새 댓글을 기존 댓글 목록에 추가
    setComments([...comments, comment]);

    // 댓글 입력 필드 초기화
    setComment("");
  };

  useEffect(() => {
    // Firebase Firestore에서 해당 게시물의 정보를 가져오는 비동기 함수
    async function fetchPost() {
      try {
        const postRef = doc(collection(db, "posts"), postId); // "posts"는 컬렉션 이름, yourFirestoreInstance는 Firestore 인스턴스입니다.
        const docSnap = await getDoc(postRef);

        if (docSnap.exists()) {
          const postData = docSnap.data(); // 게시물 정보를 가져옵니다.
          setDetailPost(postData);
        } else {
          console.log("게시물을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
      }
    }
    console.log(postId);
    fetchPost(); // 게시물 정보를 가져오는 함수 호출
  }, [postId]);

  // 게시물 정보가 로드되기 전에는 로딩 상태를 처리할 수 있습니다.
  if (!detailPost) {
    return <div>Loading...</div>;
  }
  return (
    <CenteredContainer>
      <DetailContainer>
        <PostHeaderBox>
          <WritingBox>
            <PostTitle>{detailPost.title}</PostTitle>
            <PostTime>{detailPost.postTime}</PostTime>
          </WritingBox>

          <PostAuthor>{detailPost.author}</PostAuthor>
        </PostHeaderBox>
        <PostContentBox>
          {detailPost.previewImage ? <PreviewImage>{detailPost.previewImage}</PreviewImage> : null}

          <PostContent>{detailPost.content}</PostContent>
        </PostContentBox>
        <CommentForm onSubmit={handleSubmit}>
          <CommentInput
            placeholder="댓글을 작성하세요."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <CommentSubmitButton type="submit">작성</CommentSubmitButton>
        </CommentForm>
        <CommentBox>
          <CommentCount>댓글 수: {postContent.comments}</CommentCount>
          <Comment />
        </CommentBox>
      </DetailContainer>
    </CenteredContainer>
  );
}

export default PostDetail;
