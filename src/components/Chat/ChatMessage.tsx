// ChatMessage.tsx

import React from "react";
import styled from "styled-components";
import { FlexColumnDiv } from "../../module/styled/FlexDiv";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

const MessageContainer = styled(FlexColumnDiv)`
  margin: 30px auto;
  color: white;
`;

const Message = styled.div<{ isUser: boolean }>`
  display: inline-block;
  padding: 10px;
  background-color: ${(props) => (props.isUser ? "#4caf50" : "#008CBA")};
  border-radius: ${(props) => (props.isUser ? "12px 12px 0 12px " : "12px 12px  12px 0")};
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
`;

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  return (
    <MessageContainer>
      <Message isUser={isUser}> {message}</Message>
    </MessageContainer>
  );
};

export default ChatMessage;
