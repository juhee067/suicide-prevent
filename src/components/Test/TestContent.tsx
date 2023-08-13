import React, { useEffect, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import styled from "styled-components";

import Icon from "../common/Icon";

const MAX_VISIBILITY = 0;

const TestContentBox = styled.div`
  position: relative;
  width: 100%;
`;
const CardContainer = styled.div``;

const LeftIcon = styled(Icon)`
  position: absolute;
  top: 20%;
  left: 0;
  font-size: 3rem;
  cursor: pointer;
`;

const RightIcon = styled(Icon)`
  position: absolute;
  top: 20%;
  right: 0;
  font-size: 3rem;
  cursor: pointer;
`;

interface TestContentProps {
  children: any;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  scoreArr: (number | undefined)[];
  selectedAnswerScore: number | undefined;

  selectedQuestionIndex: number | null;
}
const TestContent = ({
  children,
  active,
  setActive,
  scoreArr,
  selectedAnswerScore,

  selectedQuestionIndex,
}: TestContentProps) => {
  const count = React.Children.count(children);

  const checkAnswer = () => {
    if (scoreArr.includes(undefined) || scoreArr.length !== 20) {
      alert("선택하지 않은 항목을 확인해주세요");
      return;
    }

    setActive((prevActive) => prevActive + 1);
  };
  return (
    <TestContentBox>
      {active > 0 && active < 20 && (
        <LeftIcon
          onClick={() => {
            setActive((i) => i - 1);
          }}
        >
          <BsFillArrowLeftCircleFill />
        </LeftIcon>
      )}

      {React.Children.map(children, (child, i) => (
        <CardContainer
          style={{
            display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
          }}
        >
          {child}
        </CardContainer>
      ))}

      {active < count && (
        <RightIcon
          onClick={() => {
            if (active === 19) {
              checkAnswer();
              return;
            }

            {
              selectedQuestionIndex === active ? setActive((i) => i + 1) : alert("문항을 선택해주세요");
            }
          }}
        >
          <BsFillArrowRightCircleFill />
        </RightIcon>
      )}
    </TestContentBox>
  );
};

export default TestContent;
