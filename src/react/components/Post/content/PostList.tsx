import { onAuthStateChanged, User } from 'firebase/auth';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth, db } from '../../../firebaseConfig';
import { getPosts } from '../../../module/firestore';
import { FlexRowDiv } from '../../../module/styled/FlexDiv';
import { Btn, Title } from '../../../module/styled/styledFont';

import Pagination from './Pagination';
import PostItem from './PostItem';

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
  @media screen and (max-width: 768px) {
    padding: 100px 0px;
  }
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
const POSTS_PER_PAGE = 10;

interface PostItemData {
  postId: string;
  userName: string;
  title: string;
  content: string;
  comments: number;
  postTime: string;
}

function BoardList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<PostItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState<User | null>(null);

  // 현재 로그인 유저를 local or session에서 가지고 와야한다
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // 사용자 상태 업데이트
    });

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트될 때 관찰 해제
    };
  }, [auth]);

  const navigate = useNavigate();
  // 현재 페이지의 게시물 목록을 계산합니다.
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지를 변경하는 함수
  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
        setLoading(false);

        // postTime을 기준으로 오래된 순서로 정렬
        fetchedPosts.sort((a, b) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime());

        for (const post of fetchedPosts) {
          if (post && post.postId) {
            await updateCommentCount(post.postId);
          }
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>문제가 발생했습니다.</div>;
  }

  // 게시물의 댓글 수를 업데이트하는 함수
  async function updateCommentCount(postId: string) {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const querySnapshot = await getDocs(commentsRef);
    const commentCount = querySnapshot.size; // 댓글 수 계산

    // 해당 게시물 문서 업데이트
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      comments: commentCount, // 댓글 수를 업데이트
    });
  }

  // 페이지를 변경하는 함수
  const AccessTokenError = () => {
    alert('로그인을 해주세요');
    return navigate('/auth/signIn');
  };

  const renderCreatePostLink = () => {
    return user ? <Link to='/PostCreate'>글쓰기</Link> : <span onClick={AccessTokenError}>글쓰기</span>;
  };

  const renderPostList = () => {
    return currentPosts.length ? (
      currentPosts.map((item) => <PostItem key={item.postId} item={item} />)
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
          postsPerPage={POSTS_PER_PAGE}
          currentPage={currentPage}
          paginate={paginate}
        />
      </PostListContainer>
    </CenteredContainer>
  );
}

export default BoardList;
