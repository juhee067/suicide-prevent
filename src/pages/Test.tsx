import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import TestMain from "../section/TestMain";
import TestResult from "../section/TestResult";

const Wrapper = styled.div`
  overflow: auto; /* 스크롤이 있는 경우만 스크롤바를 표시 */
  scrollbar-width: none; /* 기본 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE에서도 스크롤바 숨기기 */
  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 15px;
    position: absolute;
    right: 0;
    opacity: 0.5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.thumbBg};
    border: 2px solid ${({ theme }) => theme.color.thumbBorder};
    border-right: none;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.track};
    border-left: 2px solid ${({ theme }) => theme.color.thumbBorder};
  }
  @media screen and (max-width: 375px) {
    font-size: 1.2rem;
    font-weight: 300;
    &::-webkit-scrollbar {
      width: 10px;
    }
  }
`;

const TestBox = styled.div`
  padding: 20px 0;
  margin: 0 auto;
  height: 100vh;
`;

const Test = () => {
  const moveScrollPosition = useRef<HTMLDivElement | null>(null);
  const scrollToEvent = (top: number, behavior: ScrollBehavior) => {
    window.scrollTo({
      top,
      behavior,
    });
  };

  const onMoveToFunctionCard = () => {
    if (moveScrollPosition.current) {
      scrollToEvent(moveScrollPosition.current.offsetTop - 100, "smooth");
    }
  };

  useEffect(() => {
    scrollToEvent(0, "auto");
  }, []);

  return (
    <Wrapper>
      <TestBox>
        <TestMain onMoveToFunctionCard={onMoveToFunctionCard} />
        <TestResult moveScrollPosition={moveScrollPosition} />
      </TestBox>
    </Wrapper>
  );
};

export default Test;
