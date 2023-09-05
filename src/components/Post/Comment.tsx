import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FiDelete, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { displayCreatedAt } from "../../module/postTime";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption, Subtitle } from "../../module/styled/styledFont";

const CommentContainer = styled.div`
  margin-top: 30px;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.color.mainGray};
  padding: 10px;
  margin: 10px 0;
`;
const CommentBox = styled.div``;

const CommentAuthor = styled(Subtitle)`
  margin-bottom: 10px;
`;

const CommentContent = styled(Caption)`
  margin-bottom: 5px;
`;

const CommentTime = styled(Caption)`
  color: ${({ theme }) => theme.color.mainGray};
`;

const UserActions = styled(FlexRowDiv)`
  gap: 10px;
  color: ${({ theme }) => theme.color.mainGray};
  font-size: 1.8rem;
  cursor: pointer;
`;

interface CommentsProps {
  comments: DocumentData[] | null;
}

function Comment({ comments }: CommentsProps) {
  const commentsArray = comments || [];
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: any }) => state.userLoginAccessTokenSlice
  );
  const currentUser = useSelector((state: { userLoginDataSlice: any }) => state.userLoginDataSlice);

  useEffect(() => {
    console.log(currentUser);
    console.log(comments, "comments");
  });

  return (
    <CommentContainer>
      <CommentList>
        {commentsArray.map((comment) => (
          <CommentItem key={comment.commentId}>
            <CommentBox>
              <CommentAuthor>{comment.userName}</CommentAuthor>
              <CommentContent>{comment.comment}</CommentContent>
              <CommentTime>{displayCreatedAt(comment.commentTime)}</CommentTime>
            </CommentBox>
            {accessToken && currentUser && currentUser.nickname === comment.userName ? (
              // 댓글 작성자와 현재 사용자가 동일한 경우 수정 및 삭제 버튼 표시
              <UserActions>
                <FiEdit />
                <FiDelete />
              </UserActions>
            ) : null}
          </CommentItem>
        ))}
      </CommentList>
      {/* {loading && <div>Loading...</div>} */}
    </CommentContainer>
  );
}

export default Comment;
