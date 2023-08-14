import React from "react";
import styled from "styled-components";

import TestMain from "../section/TestMain";
import TestResult from "../section/TestResult";

const TestBox = styled.div`
  height: 100vh;
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
    background-color: #6f6f6f;
    border: 2px solid #353535;
    border-right: none;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }

  &::-webkit-scrollbar-track {
    background-color: #e1e1e1;
    border-left: 2px solid #353535;
  }
`;

const Test = () => {
  return (
    <TestBox>
      <TestMain />
      <TestResult />
    </TestBox>
  );
};

export default Test;
