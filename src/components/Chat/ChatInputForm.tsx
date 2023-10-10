// ChatInputForm.tsx

import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
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

interface ChatInputFormProps {
  onSendMessage: (message: string) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
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
