import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

import { BsChevronDown } from "react-icons/bs";
import { FlexColumnDiv } from "../../module/styled/FlexDiv";
import { Paragraph } from "../../module/styled/styledFont";
import Icon from "./Icon";

const IndicatorBox = styled(FlexColumnDiv)`
  text-align: center;
  cursor: pointer;
`;

const Description = styled(Paragraph)`
  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const MotionBox = styled.div`
  height: 20px;
`;

const scrollAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
`;

const AnimatedIcon = styled(Icon)`
  display: inline-block;
  font-weight: 700;
  animation: ${scrollAnimation} 1s linear infinite;
`;

interface ScrollIndicatorProps {
  children: ReactNode;
  onClick: () => void; // 클릭 이벤트 핸들러 타입 정의
  position?: string;
}

const ScrollIndicator = ({ children, onClick, position }: ScrollIndicatorProps) => {
  return (
    <IndicatorBox onClick={onClick}>
      <Description>{children}</Description>
      <MotionBox>
        <AnimatedIcon>
          <BsChevronDown />
        </AnimatedIcon>
      </MotionBox>
    </IndicatorBox>
  );
};
export default ScrollIndicator;
