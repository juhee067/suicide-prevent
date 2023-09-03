import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption, Subtitle } from "../../module/styled/styledFont";

// 댓글 데이터 예시
const commentData = [
  { id: 1, author: "댓글 작성자 1", content: "댓글 내용 1", commentTime: "2023.09.25" },
  { id: 2, author: "댓글 작성자 2", content: "댓글 내용 2", commentTime: "2023.09.26" },
  { id: 3, author: "댓글 작성자 3", content: "댓글 내용 3", commentTime: "2023.09.27" },
  { id: 4, author: "댓글 작성자 4", content: "댓글 내용 1", commentTime: "2023.09.25" },
  { id: 5, author: "댓글 작성자 5", content: "댓글 내용 2", commentTime: "2023.09.26" },
  { id: 6, author: "댓글 작성자 6", content: "댓글 내용 3", commentTime: "2023.09.27" },
  { id: 7, author: "댓글 작성자 7", content: "댓글 내용 1", commentTime: "2023.09.25" },
  { id: 8, author: "댓글 작성자 8", content: "댓글 내용 2", commentTime: "2023.09.26" },
  { id: 9, author: "댓글 작성자 9", content: "댓글 내용 3", commentTime: "2023.09.27" },
];

const CommentContainer = styled.div`
  margin-top: 30px;
`;

const CommentHeader = styled(FlexRowDiv)`
  justify-content: space-between;
  align-items: center;
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  border-bottom: 1px solid ${({ theme }) => theme.color.mainGray};
  padding: 10px;
  margin: 10px 0;
`;

const CommentAuthor = styled(Subtitle)`
  margin-bottom: 10px;
`;

const CommentContent = styled(Caption)`
  margin-bottom: 5px;
`;

const CommentTime = styled(Caption)`
  color: ${({ theme }) => theme.color.mainGray};
`;

type CommentProps = {
  id: number;
  author: string;
  content: string;
  commentTime: string;
};

function Comment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5); // 페이지당 댓글 수
  const [loadedComments, setLoadedComments] = useState<CommentProps[]>([]); // 또는 댓글의 타입을 정확히 지정해주세요

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", handleScroll);
    return () => {
      // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 제거
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loadMoreComments = () => {
    // 새로운 페이지의 댓글을 불러오는 로직을 추가
    const startIndex = (currentPage - 1) * commentsPerPage;
    const endIndex = startIndex + commentsPerPage;
    const newComments = commentData.slice(startIndex, endIndex);

    // 로딩 중 상태 업데이트
    setLoading(true);

    // 일정 시간 후에 댓글 목록 업데이트 및 로딩 상태 해제
    setTimeout(() => {
      setLoadedComments((prevComments) => [...prevComments, ...newComments]);
      setCurrentPage(currentPage + 1);
      setLoading(false);
    }, 1000); // 예시로 1초 뒤에 댓글 목록 업데이트
  };

  const handleScroll = () => {
    // 스크롤 이벤트 핸들링 함수
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // 스크롤이 페이지의 가장 하단에 도달했을 때
      if (!loading) {
        // 로딩 중이 아니라면 댓글 추가 로딩
        loadMoreComments();
      }
    }
  };

  return (
    <CommentContainer>
      <CommentHeader>{/* 댓글 목록 헤더 */}</CommentHeader>
      <CommentList>
        {loadedComments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentAuthor>{comment.author}</CommentAuthor>
            <CommentContent>{comment.content}</CommentContent>
            <CommentTime>{comment.commentTime}</CommentTime>
          </CommentItem>
        ))}
      </CommentList>
      {loading && <div>Loading...</div>}
    </CommentContainer>
  );
}

export default Comment;
