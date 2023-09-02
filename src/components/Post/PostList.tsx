import React from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption, Description, H2, H3, Paragraph, Subtitle } from "../../module/styled/styledFont";

// 가상 데이터: 게시글 목록
const mockData = [
  { id: 1, title: "게시글 제목 1", content: "게시글 내용 1" },
  { id: 2, title: "게시글 제목 2", content: "게시글 내용 2" },
  { id: 3, title: "게시글 제목 3", content: "게시글 내용 3" },
];

// 네비게이션 바 높이
const navHeight = 52;
// 계산된 padding-top 값을 저장하는 JavaScript 변수
const paddingTopValue = `calc(100px + ${navHeight}px)`;

// 스타일드 컴포넌트를 사용하여 목록 스타일을 정의합니다.
const CenteredContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  min-height: 100%; /* 최소 높이를 100%로 설정합니다. */
  padding: ${paddingTopValue} 0 100px;
`;

const ListContainer = styled.div`
  width: 70%;
  padding: 20px;
  text-align: center;
`;

const PostListBox = styled(FlexRowDiv)`
  height: 20%;
  padding: 20px 0;
  justify-content: space-between;
`;

const SearchBox = styled.div``;

const ListBox = styled(FlexRowDiv)`
  justify-content: space-between;
  padding: 20px 0;
  margin-bottom: 16px;
  border-top: 1px solid ${({ theme }) => theme.color.mainBlack};
  text-align: left;
`;

const ListItemBox = styled.div`
  width: 60%;
`;
const UserNickname = styled(Subtitle)``;

const ListTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
`;

const ListContent = styled(Description)``;

const Etc = styled.div``;
const Comment = styled.div`
  margin-bottom: 20px;
`;
const PostTime = styled(Caption)``;

function BoardList() {
  return (
    <CenteredContainer>
      <ListContainer>
        <PostListBox>
          <H3> 허심탄회</H3>
          <SearchBox> 검색</SearchBox>
        </PostListBox>
        {mockData.map((item) => (
          <ListBox key={item.id}>
            <UserNickname>김세돌</UserNickname>
            <ListItemBox>
              <ListTitle>{item.title}</ListTitle>
              <ListContent>{item.content}</ListContent>
            </ListItemBox>
            <Etc>
              <Comment>댓글 수</Comment>
              <PostTime> 3일전</PostTime>
            </Etc>
          </ListBox>
        ))}
      </ListContainer>
    </CenteredContainer>
  );
}

export default BoardList;
