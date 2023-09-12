import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebaseConfig";

import { Caption } from "../../module/styled/styledFont";
import Comment from "./Comment";

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

function CommentView({ postId }: any) {
  const uniqueId = useId();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<DocumentData[]>([]);
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: any }) => state.userLoginAccessTokenSlice
  );
  const currentUser = useSelector((state: { userLoginDataSlice: any }) => state.userLoginDataSlice);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    createComment();

    // 댓글 입력 필드 초기화
    setComment("");
  };
  const usersCollectionRef = collection(db, `posts/${postId}/comments`);

  useEffect(() => {
    // Firebase Firestore에서 해당 게시물의 댓글 정보를 가져오는 비동기 함수
    async function fetchComments() {
      try {
        const commentsRef = collection(db, `posts/${postId}/comments`); // "comments"는 댓글 컬렉션 이름
        const querySnapshot = await getDocs(commentsRef);

        if (!querySnapshot.empty) {
          const commentsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return { ...data, commentId: doc.id }; // 댓글 문서 ID를 추가해서 저장
          });
          setComments(commentsData);
        } else {
          console.log("댓글을 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("댓글을 불러오는 중 오류가 발생했습니다.", error);
      }
    }

    fetchComments(); // 댓글 정보를 가져오는 함수 호출
  }, []);

  // 게시물 정보가 로드되기 전에는 로딩 상태를 처리할 수 있습니다.

  const AccessTokenError = () => {
    alert("로그인을 해주세요");
  };

  const createComment = async () => {
    try {
      // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
      await addDoc(usersCollectionRef, {
        commentId: uniqueId,
        userName: currentUser.nickname,
        comment: comment,
        commentTime: new Date().toISOString(),
      });

      setComment("");
      console.log("댓글 전달");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  return (
    <>
      <CommentForm>
        <CommentInput
          placeholder="댓글을 작성하세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        {accessToken ? (
          <CommentSubmitButton onClick={handleSubmit}>작성</CommentSubmitButton>
        ) : (
          <CommentSubmitButton onClick={AccessTokenError}>작성</CommentSubmitButton>
        )}
      </CommentForm>
      <CommentBox>
        {comments ? (
          <>
            <CommentCount>댓글 수: {comments.length}</CommentCount>
            <Comment comments={comments} />
          </>
        ) : (
          <CommentCount>댓글이 없습니다.</CommentCount>
        )}
      </CommentBox>
    </>
  );
}

export default CommentView;
