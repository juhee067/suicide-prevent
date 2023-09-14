import { collection, doc, DocumentData, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { displayCreatedAt } from "../../module/postTime";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Btn, Caption, Description, Subtitle, Title } from "../../module/styled/styledFont";

// 네비게이션 바 높이
const navHeight = 52;
// 계산된 padding-top 값을 저장하는 JavaScript 변수
const paddingTopValue = `calc(100px + ${navHeight}px)`;

// 스타일드 컴포넌트를 사용하여 목록 스타일을 정의합니다.
const CenteredContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const PostListContainer = styled.div`
  padding: ${paddingTopValue} 0 70px;
`;

const ListContainer = styled.div`
  width: 70%;
  margin: 0 auto;
  padding: 30px;
  text-align: center;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const PostListBox = styled(FlexRowDiv)`
  padding: 20px 0;
  justify-content: space-between;
`;

const SearchBox = styled(Btn)``;

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

// 페이지당 표시할 게시물 수
const postsPerPage = 6;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ $active: boolean }>`
  background-color: ${(props) => (props.$active ? "#000" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#000")};
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
`;

function BoardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<DocumentData[]>([]);
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: any }) => state.userLoginAccessTokenSlice
  );
  const navigate = useNavigate();
  // 현재 페이지의 게시물 목록을 계산합니다.
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지를 변경하는 함수
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const usersCollectionRef = collection(db, "posts");

    // 비동기로 데이터 받을준비
    const getPosts = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);
      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      const postsData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      for (const post of postsData) {
        await updateCommentCount(post.id);
      }

      setPosts(postsData);
    };

    getPosts();
  }, []);

  // 게시물의 댓글 수를 업데이트하는 함수
  async function updateCommentCount(postId: string) {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(commentsRef);
    const commentCount = querySnapshot.size; // 댓글 수 계산

    // 해당 게시물 문서 업데이트
    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
      comments: commentCount, // 댓글 수를 업데이트
    });
  }

  // 페이지를 변경하는 함수
  const AccessTokenError = () => {
    alert("로그인을 해주세요");
    return navigate("/auth/signIn");
  };

  return (
    <CenteredContainer>
      <PostListContainer>
        <ListContainer>
          <PostListBox>
            <Title>허심탄회</Title>
            <SearchBox>
              {accessToken ? (
                <Link to={`/PostCreate`}>글쓰기</Link>
              ) : (
                <span onClick={AccessTokenError}>글쓰기</span>
              )}
            </SearchBox>
          </PostListBox>
          {currentPosts.length
            ? currentPosts.map((item, index) => (
                <Link to={`/post/${item.id}`} key={index}>
                  <ListBox key={item.id}>
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
              ))
            : "응원 메시지가 없습니다"}
        </ListContainer>
        <PaginationContainer>
          {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
            <PageButton
              key={index}
              $active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
        </PaginationContainer>
      </PostListContainer>
    </CenteredContainer>
  );
}

export default BoardList;
