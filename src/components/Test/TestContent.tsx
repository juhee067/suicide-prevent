import React, { useState } from "react";
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

const TestContent = ({ children }: any) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  console.log(active);
  return (
    <TestContentBox>
      {active > 0 && (
        <LeftIcon onClick={() => setActive((i) => i - 1)}>
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
      {active < count - 1 && (
        <RightIcon onClick={() => setActive((i) => i + 1)}>
          <BsFillArrowRightCircleFill />
        </RightIcon>
      )}
    </TestContentBox>
  );
};

export default TestContent;
