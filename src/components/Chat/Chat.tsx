import { onAuthStateChanged, User } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import { fetchMessages } from "../../api/message";
import { auth } from "../../firebaseConfig";
import ChatInputForm from "./ChatInputForm";
import ChatMessage from "./ChatMessage";

const ChatContainer = styled.div`
  margin: 0 auto;
  width: 100%;
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
  const [userName, setUserName] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  // 현재 로그인 유저를 local or session에서 가지고 와야한다
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserName(user?.displayName ?? null); // 사용자 상태 업데이트
    });

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트될 때 관찰 해제
    };
  }, [messages]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 Firestore에서 메시지를 가져오는 함수를 호출
    fetchMessages(setMessages);
  }, []); // 빈 배열을 전달하여 한 번만 호출되도록 함

  // 새로운 메시지가 추가되면 스크롤을 아래로 이동
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ChatContainer>
      <ChatMessageBox ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            message={msg.text}
            user={msg.nickname}
            time={msg.createdAt}
            currentUser={userName}
          />
        ))}
      </ChatMessageBox>
      <ChatInputForm />
    </ChatContainer>
  );
};

export default Chat;
