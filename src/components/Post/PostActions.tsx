import React from "react";
import { FiEdit, FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";

const UserActions = styled(FlexRowDiv)`
  gap: 10px;
  color: ${({ theme }) => theme.color.mainGray};
  font-size: 1.8rem;
  cursor: pointer;
`;
interface PostActionsProps {
  postId: string;
  accessToken: string;
  currentUser: string;
  postDelete: (postId: string) => Promise<void>;
}

const PostActions = ({ postId, accessToken, currentUser, postDelete }: PostActionsProps) => {
  return (
    <UserActions>
      <Link to={`/post/edit/${postId}`}>
        <FiEdit />
      </Link>
      <FiDelete onClick={() => postDelete(postId)} />
    </UserActions>
  );
};

export default PostActions;
