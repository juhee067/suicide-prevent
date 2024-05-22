import React from "react";
import styled from "styled-components";

const DoorBox = styled.div`
  position: relative;
`;

const DoorContainer = styled.div<DoorProps>`
  margin: 52px auto 0;
  position: relative;
  width: ${({ width }) => width};
  height: calc(100vh - 52px);
  background-color: ${({ theme }) => theme.color.mainWhite};
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  border-top: 0;
  border-bottom: 0;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const DoorHand = styled.div<HandProps>`
  position: absolute;
  top: 50%;
  ${({ side }) => (side === "left" ? "right" : "left")}: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.SubGray};
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  border-radius: 10px;
`;

interface DoorProps {
  side: "left" | "right";
  width: string;
}

interface HandProps {
  side: "left" | "right";
}

const Door: React.FC<DoorProps> = ({ side, width }) => {
  return (
    <DoorBox>
      <DoorContainer width={width} side={side}>
        <DoorHand side={side} />
      </DoorContainer>
    </DoorBox>
  );
};

export default Door;
