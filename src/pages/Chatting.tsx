import React from "react";
import { styled } from "styled-components";
import Chat from "../components/Chat/Chat";

const ChatWrapper = styled.div`
  background-color: #e9e9e9;
  height: 100vh;
`;

const Chatting = () => {
  return (
    <ChatWrapper>
      <Chat />
    </ChatWrapper>
  );
};

export default Chatting;
