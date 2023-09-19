import React from "react";
import { styled } from "styled-components";

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

interface PostItemData {
  id: string;
  userName: string;
  title: string;
  content: string;
  comments: number;
  postTime: string;
}

interface PaginationProps {
  posts: PostItemData[]; // posts 배열의 타입은 실제로 사용되는 타입에 맞게 수정해야 합니다.
  postsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ posts, postsPerPage, currentPage, paginate }) => {
  return (
    <PaginationContainer>
      {Array.from({ length: Math.ceil(posts.length / postsPerPage) }).map((_, index) => (
        <PageButton key={index} $active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
          {index + 1}
        </PageButton>
      ))}
    </PaginationContainer>
  );
};

export default Pagination;
