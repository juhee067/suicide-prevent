import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { auth, db } from "../../firebaseConfig";
import { formatDateTime } from "../../module/postTime";

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #c8c8c8;
  padding: 10px;
`;

const InputField = styled.input`
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #000;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ChatInputForm = () => {
  const [message, setMessage] = useState("");
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const messagesRef = collection(db, "messages");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      if (message.trim() !== "") {
        try {
          // 새로운 메시지를 Firestore에 추가
          await addDoc(messagesRef, {
            text: message,
            createdAt: formatDateTime(new Date()).toLocaleString(),
            nickname: user.displayName,
          });
          // 입력 필드 초기화
          setMessage("");
        } catch (error) {
          console.error("Error adding message: ", error);
        }
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoginUser(user); // 사용자 상태 업데이트
    });

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트될 때 관찰 해제
    };
  }, [auth]);

  const userInput = (
    <InputContainer>
      <InputField
        type="text"
        placeholder="메시지를 입력하세요..."
        value={message}
        onChange={handleInputChange}
      />
      <SendButton type="submit">전송</SendButton>
    </InputContainer>
  );

  const guestInput = (
    <InputContainer>
      <InputField type="text" placeholder="로그인해주세요" disabled />
    </InputContainer>
  );

  return <form onSubmit={handleSubmit}>{loginUser ? userInput : guestInput}</form>;
};

export default ChatInputForm;
