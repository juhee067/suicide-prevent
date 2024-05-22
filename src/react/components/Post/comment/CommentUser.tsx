// CommentItem.js
import React from 'react';
import styled from 'styled-components';
import { FlexRowDiv } from '../../../module/styled/FlexDiv';
import { Caption } from '../../../module/styled/styledFont';
import CommentActions from './CommentActions';

const CommentUserBox = styled(FlexRowDiv)`
  justify-content: space-between;
`;

const CommentAuthor = styled(Caption)`
  font-weight: 500;
  margin-bottom: 10px;
`;

function CommentUser({
  editStatus,
  commentItems,
  accessToken,
  currentUser,
  handleEditClick,
  commentDelete,
  loginUser,
}: any) {
  const { commentId, userName, comment: commentText } = commentItems;

  return (
    <CommentUserBox>
      <CommentAuthor>{userName}</CommentAuthor>
      {loginUser === userName ? (
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
