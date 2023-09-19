import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db } from "../../firebaseConfig";
import { getPosts } from "../../module/firestore";

import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Btn, Title } from "../../module/styled/styledFont";
import Pagination from "./Pagination";
import PostItem from "./PostItem";

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

// 페이지당 표시할 게시물 수
const postsPerPage = 6;

interface PostItemData {
  id: string;
  userName: string;
  title: string;
  content: string;
  comments: number;
  postTime: string;
}

function BoardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostItemData[]>([]);
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
    async function getPost() {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    getPost();
  }, []);

  // 게시물의 댓글 수를 업데이트하는 함수
  // async function updateCommentCount(postId: string) {
  //   const commentsRef = collection(db, `posts/${postId}/comments`);
  //   const querySnapshot = await getDocs(commentsRef);
  //   const commentCount = querySnapshot.size; // 댓글 수 계산

  //   // 해당 게시물 문서 업데이트
  //   const postRef = doc(db, "posts", postId);
  //   await updateDoc(postRef, {
  //     comments: commentCount, // 댓글 수를 업데이트
  //   });
  // }

  // 페이지를 변경하는 함수
  const AccessTokenError = () => {
    alert("로그인을 해주세요");
    return navigate("/auth/signIn");
  };

  const renderCreatePostLink = () => {
    return accessToken ? (
      <Link to="/PostCreate">글쓰기</Link>
    ) : (
      <span onClick={AccessTokenError}>글쓰기</span>
    );
  };

  const renderPostList = () => {
    return currentPosts.length ? (
      currentPosts.map((item) => <PostItem key={item.id} item={item} />)
    ) : (
      <div>응원 메시지가 없습니다</div>
    );
  };

  return (
    <CenteredContainer>
      <PostListContainer>
        <ListContainer>
          <PostListBox>
            <Title>허심탄회</Title>
            <SearchBox>{renderCreatePostLink()}</SearchBox>
          </PostListBox>
          {renderPostList()}
        </ListContainer>
        <Pagination
          posts={posts}
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
      </PostListContainer>
    </CenteredContainer>
  );
}

export default BoardList;
