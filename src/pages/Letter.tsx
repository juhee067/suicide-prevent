import React from "react";
import styled from "styled-components";
import LetterContent from "../components/LetterContent";
import Guestbook from "./Guestbook";

const LeftDoor = styled.div`
  position: fixed;
  top: 52px;
  left: 0;
  width: 15%;
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

const RightDoor = styled.div`
    position: fixed;
  top: 52px;
  right: 0;
  width: 15%;
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
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

const Letter = () => {
  return (
    <div>
      <LeftDoor>
        <LeftDoorHand />
      </LeftDoor>
      <Guestbook />
      <RightDoor>
        <RightDoorHand />
      </RightDoor>
    </div>
  );
};

export default Letter;
