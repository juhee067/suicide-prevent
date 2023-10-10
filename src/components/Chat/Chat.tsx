import React, { useState } from "react";
import { styled } from "styled-components";
import ChatInputForm from "./ChatInputForm";
import ChatMessage from "./ChatMessage";

const ChatContainer = styled.div`
  margin: 0 auto;
  padding: 10px;
  width: 80%;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.color.mainWhite};
  transform: translateY(50px);
`;

const ChatMessageBox = styled.div`
  height: 600px; /* 최대 높이 지정 */
  overflow-y: auto; /* 스크롤 활성화 */
  padding: 10px; /* 내용과 스크롤 간격을 추가할 수 있습니다. */
`;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { message: "안녕하세요!", isUser: true },
    { message: "안녕하세요! 반가워요.", isUser: false },
    { message: "오늘 날씨가 좋네요.", isUser: true },
    { message: "네, 정말 좋아요.", isUser: false },
  ]);

  const handleSendMessage = (message: string) => {
    // 메시지를 새로운 메시지 목록에 추가합니다.
    setMessages([...messages, { message, isUser: true }]);
  };
  return (
    <ChatContainer>
      <ChatMessageBox>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.message} isUser={msg.isUser} />
        ))}
      </ChatMessageBox>
      <ChatInputForm onSendMessage={handleSendMessage} />
    </ChatContainer>
  );
};

export default Chat;
