import React from "react";
import { styled } from "styled-components";
import Chat from "../components/Chat/Chat";

const ChatWrapper = styled.div`
  padding: 100px;
  height: 100vh;
  background-color: #e9e9e9;
`;

const Chatting = () => {
  return (
    <ChatWrapper>
      <Chat />
    </ChatWrapper>
  );
};

export default Chatting;
