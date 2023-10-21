import React, { useState, useEffect, useId } from "react";
import { collection, getDocs, addDoc, DocumentData } from "firebase/firestore";
import styled from "styled-components";
import { db } from "../../../firebaseConfig";

import { Caption } from "../../../module/styled/styledFont";
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

  const fetchComments = async () => {
    try {
      const commentsRef = collection(db, `posts/${postId}/comments`);
      const querySnapshot = await getDocs(commentsRef);

      if (!querySnapshot.empty) {
        const commentsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, commentId: doc.id };
        });
        setComments(commentsData);
      } else {
        console.log("댓글을 찾을 수 없습니다.");
        setComments([]);
      }
    } catch (error) {
      console.error("댓글을 불러오는 중 오류가 발생했습니다.", error);
    }
  };

  useEffect(() => {
    fetchComments(); // 컴포넌트가 마운트될 때 댓글을 가져와 상태를 업데이트합니다.
  }, [postId]);
  const AccessTokenError = () => {
    alert("로그인을 해주세요");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(comment);
    if (!comment.trim()) {
      alert("댓글 내용을 입력하세요.");
      return;
    }
    await createComment();
    setComment("");
  };
  const createComment = async () => {
    try {
      const newComment = {
        commentId: Date.now().toString(), // 고유한 ID 생성
        // userName: currentUser.nickName,
        comment: comment,
        commentTime: new Date().toISOString(),
      };

      setComments((prevComments) => [...prevComments, newComment]);

      const commentsRef = collection(db, `posts/${postId}/comments`);
      await addDoc(commentsRef, newComment);
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
        <CommentSubmitButton onClick={handleSubmit}>작성</CommentSubmitButton>
      </CommentForm>
      <CommentBox>
        {comments !== null ? (
          <>
            <CommentCount>댓글 수: {comments.length}</CommentCount>
            <Comment comments={comments} postId={postId} fetchComments={fetchComments} />
          </>
        ) : (
          <CommentCount>댓글이 없습니다.</CommentCount>
        )}
      </CommentBox>
    </>
  );
}

export default CommentView;
