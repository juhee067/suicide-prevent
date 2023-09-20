import { DocumentData } from "firebase/firestore";
import React, { useState } from "react";
import { styled } from "styled-components";

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
const EditComment = ({
  editedComment,
  setEditedComment,
  handleEditSubmit,
  handleCancelClick,
  commentId,
}: any) => {
  return (
    <CommentForm>
      <CommentInput
        placeholder="댓글을 작성하세요."
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
      />
      <CommentSubmitButton onClick={() => handleEditSubmit(commentId)}>수정 완료</CommentSubmitButton>
      <CommentSubmitButton onClick={handleCancelClick}>취소</CommentSubmitButton>
    </CommentForm>
  );
};

export default EditComment;
