// ChatMessage.tsx

import React, { useEffect } from "react";
import styled from "styled-components";
import { FlexColumnDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { Caption } from "../../module/styled/styledFont";

interface ChatMessageProps {
  message: string;
  user: string;
  time: string;
  currentUser: string;
}

const MessageContainer = styled(FlexColumnDiv)`
  margin: 30px auto;
`;

const Message = styled(FlexRowDiv)<{ isUser: boolean }>`
  flex-direction: ${(props) => (props.isUser ? "row" : "row-reverse")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  align-items: flex-end;
  gap: 10px;
`;

const UserBox = styled(FlexColumnDiv)<{ isUser: boolean }>`
  align-items: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const Nickname = styled(Caption)`
  margin: 0 5px 5px 0;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Content = styled.div<{ isUser: boolean }>`
  padding: 10px;
  border: 2px solid ${(props) => (props.isUser ? "#000000" : "#ffffff")};
  background-color: ${(props) => (props.isUser ? "#fff" : "#000")};
  border-radius: ${(props) => (props.isUser ? "12px 12px 0 12px " : "12px 12px  12px 0")};
  color: ${(props) => (props.isUser ? "#000" : "#fff")};
`;

const TimeBox = styled.div``;
const Time = styled.div`
  color: #a7a7a7;
  font-size: 1.2rem;
  font-weight: 300;
`;

const ChatMessage: React.FC<ChatMessageProps> = ({ message, user, currentUser, time }) => {
  const isCurrentUser = user === currentUser;
  return (
    <MessageContainer>
      <Message isUser={isCurrentUser}>
        <TimeBox>
          <Time>{time}</Time>
        </TimeBox>
        <UserBox isUser={isCurrentUser}>
          <Nickname>{isCurrentUser ? currentUser : user}</Nickname>
          <Content isUser={isCurrentUser}>{message}</Content>
        </UserBox>
      </Message>
    </MessageContainer>
  );
};

export default ChatMessage;
