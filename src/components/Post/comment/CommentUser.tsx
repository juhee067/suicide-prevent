// CommentItem.js
import React, { useEffect } from "react";
import styled from "styled-components";
import { displayCreatedAt } from "../../../module/postTime";
import { FlexRowDiv } from "../../../module/styled/FlexDiv";
import { Caption } from "../../../module/styled/styledFont";
import CommentActions from "./CommentActions";

const CommentBox = styled.div`
  width: 100%;
`;
const CommentUserBox = styled(FlexRowDiv)`
  justify-content: space-between;
`;

const CommentAuthor = styled(Caption)`
  font-weight: 500;
  margin-bottom: 10px;
`;

const CommentContent = styled(Caption)`
  margin-bottom: 5px;
`;

const CommentTime = styled(Caption)`
  color: ${({ theme }) => theme.color.mainGray};
`;

function CommentUser({
  editStatus,
  commentItems,
  accessToken,
  currentUser,
  handleEditClick,
  commentDelete,
}: any) {
  const { commentId, userName, comment: commentText } = commentItems;

  return (
    <CommentUserBox>
      <CommentAuthor>{userName}</CommentAuthor>
      {accessToken && currentUser && currentUser.nickName === userName ? (
        <CommentActions
          commentId={commentId}
          commentText={commentText}
          handleEditClick={handleEditClick}
          commentDelete={commentDelete}
          editStatus={editStatus}
        />
      ) : null}
    </CommentUserBox>
  );
}

export default CommentUser;
