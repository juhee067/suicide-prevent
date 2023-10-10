// ChatInputForm.tsx

import firebase from "firebase/compat";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";

import { db } from "../../firebaseConfig";

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
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;

const ChatInputForm = () => {
  const [message, setMessage] = useState("");

  const messagesRef = collection(db, "messages");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      try {
        // 새로운 메시지를 Firestore에 추가
        await addDoc(messagesRef, {
          text: message,
          createdAt: serverTimestamp(), // 서버 시간으로 설정
        });

        // 입력 필드 초기화
        setMessage("");
      } catch (error) {
        console.error("Error adding message: ", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <InputField
          type="text"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={handleInputChange}
        />
        <SendButton type="submit">전송</SendButton>
      </InputContainer>
    </form>
  );
};

export default ChatInputForm;
