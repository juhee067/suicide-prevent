// CommentActions.js
import React from "react";
import styled from "styled-components";
import { FiDelete, FiEdit } from "react-icons/fi";
import { FlexRowDiv } from "../../../module/styled/FlexDiv";

const UserActions = styled(FlexRowDiv)`
  gap: 10px;
  color: ${({ theme }) => theme.color.mainGray};
  font-size: 1.8rem;
  cursor: pointer;
`;

function CommentActions({ commentId, commentText, handleEditClick, commentDelete, editStatus }: any) {
  return (
    <>
      {editStatus ? null : (
        <UserActions>
          <FiEdit onClick={() => handleEditClick(commentId, commentText)} />
          <FiDelete onClick={() => commentDelete(commentId)} />
        </UserActions>
      )}
    </>
  );
}

export default CommentActions;
