import React from 'react';
import { styled } from 'styled-components';

import { Link } from 'react-router-dom';
import { FlexRowDiv } from '../../../module/styled/FlexDiv';
import { Caption, Description, Subtitle } from '../../../module/styled/styledFont';
import { displayCreatedAt } from '../../../module/postTime';

const ListBox = styled(FlexRowDiv)`
  justify-content: space-between;
  padding: 20px 0;
  margin-bottom: 10px;
  border-top: 2px solid ${({ theme }) => theme.color.mainBlack};
  text-align: left;
`;

const ListItemBox = styled.div`
  width: 60%;
`;

const UserNickname = styled(Subtitle)`
  width: 20%;
`;

const ListTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ListContent = styled(Description)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* 필요에 따라 최대 너비를 조정하세요. */
`;

const Etc = styled.div`
  text-align: right;
`;

const Comment = styled(Caption)`
  margin-bottom: 20px;
`;

const PostTime = styled.div``;

// item 매개변수의 타입을 명시
interface PostItemProps {
  item: {
    postId: string;
    userName: string;
    title: string;
    content: string;
    comments: number;
    postTime: string; // 이 부분은 실제 데이터 타입에 따라 수정해야 합니다.
  };
}

const PostItem: React.FC<PostItemProps> = ({ item }) => {
  return (
    <Link to={`/post/${item.postId}`} key={item.postId}>
      <ListBox key={item.postId}>
        <UserNickname>{item.userName}</UserNickname>
        <ListItemBox>
          <ListTitle>{item.title}</ListTitle>
          <ListContent>{item.content}</ListContent>
        </ListItemBox>
        <Etc>
          <Comment>댓글 {item.comments}</Comment>
          <PostTime>{displayCreatedAt(item.postTime)}</PostTime>
        </Etc>
      </ListBox>
    </Link>
  );
};

export default PostItem;
