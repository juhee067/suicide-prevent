import { collection, DocumentData, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { fetchMessages } from "../../api/message";
import ChatInputForm from "./ChatInputForm";
import ChatMessage from "./ChatMessage";

const ChatContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 1200px;
  background-color: ${({ theme }) => theme.color.mainWhite};
  transform: translateY(50px);
  font-size: 1.5rem;
`;

const ChatMessageBox = styled.div`
  height: 600px; /* 최대 높이 지정 */
  overflow-y: auto; /* 스크롤 활성화 */
  padding: 30px; /* 내용과 스크롤 간격을 추가할 수 있습니다. */
`;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<DocumentData[]>([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Firestore에서 메시지를 가져오는 함수를 호출
    console.log(messages);
    fetchMessages(setMessages);
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함

  return (
    <ChatContainer>
      <ChatMessageBox>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.text} isUser={msg.nickname} time={msg.createdAt} />
        ))}
      </ChatMessageBox>
      <ChatInputForm />
    </ChatContainer>
  );
};

export default Chat;
