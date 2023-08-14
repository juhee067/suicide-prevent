import React, { ReactText } from "react";
import styled from "styled-components";

const DoorBox = styled.div`
  position: relative;
`;
const LeftDoor = styled.div<DoorProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ width }) => width};
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-top: 0;
  z-index: 900;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const LeftDoorHand = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: #474747;
  border: 1px solid #000;
  border-radius: 10px;
`;

const RightDoor = styled.div<DoorProps>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ width }) => width};
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-right: none;
  border-top: 0;
  z-index: 900;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;

const RightDoorHand = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: #474747;
  border-radius: 10px;
`;
interface DoorProps {
  width: string;
}
const Door: React.FC<DoorProps> = ({ width }) => {
  return (
    <DoorBox>
      <LeftDoor width={width}>
        <LeftDoorHand />
      </LeftDoor>
      <RightDoor width={width}>
        <RightDoorHand />
      </RightDoor>
    </DoorBox>
  );
};

export default Door;
