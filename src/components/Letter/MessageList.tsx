import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { Message } from "../../module/MessageType";
import { displayCreatedAt } from "../../module/postTime";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import EditionForm from "./EditionForm";
import View from "./View";

const MessageListBox = styled.div`
  padding: 20px;
  height: 430px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.color.MessageList};
  background-color: ${({ theme }) => theme.color.MessageListBg};
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 15px;
    position: absolute;
    right: 0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.thumbBg};
    border: 2px solid ${({ theme }) => theme.color.thumbBorder};
    border-right: none;
    border-top: none;
    border-bottom: none;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.color.track};
    border-left: 2px solid ${({ theme }) => theme.color.thumbBorder};
  }
`;

const MessageItem = styled(FlexRowDiv)`
  margin-bottom: 15px;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.color.MessageList};
  border-radius: 5px;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const UserContent = styled.div`
  width: 100%;
`;

const PostTime = styled.div`
  padding: 0 0 10px 10px;
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.color.SubGray};
`;

interface MessageListProps {
  messages: Message[];
  setSelectedMessageId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingPassword: React.Dispatch<React.SetStateAction<string>>;
  editingPassword: string;
  fetchMessages: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  setSelectedMessageId,
  setIsDeleteModalOpen,
  setEditingPassword,
  editingPassword,
  fetchMessages,
}) => {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingCreatedAt, setEditingCreatedAt] = useState("");

  const handleDeleteEntry = (id: number) => {
    setSelectedMessageId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/${id}`);
      const messageToEdit = response.data;

      if (!editingPassword) {
        alert("비밀번호를 입력해주세요");
        return;
      }

      if (editingPassword !== messageToEdit.password) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      alert("게시물이 수정되었습니다");

      await axios.put(`http://localhost:3001/comments/${id}`, {
        message: editedMessage,
        title: editedTitle,
        password: editingPassword,
        createdAt: editingCreatedAt,
      });

      setEditingMessageId(null);
      setEditedTitle("");
      setEditedMessage("");
      setEditingCreatedAt("");
      setEditingPassword("");
      fetchMessages();
    } catch (error) {
      console.error("PUT 요청 에러:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditedMessage("");
    setEditingPassword("");
    setEditingCreatedAt("");
  };

  const handleEditEntry = (editedMessage: Message) => {
    const { id, message, title, createdAt } = editedMessage;
    setEditingMessageId(id);
    setEditedMessage(message);
    setEditedTitle(title);
    setEditingPassword("");
    setEditingCreatedAt(displayCreatedAt(createdAt));
  };

  const renderMessageContent = (message: Message) =>
    editingMessageId === message.id ? (
      <EditionForm
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
        handleSaveEdit={handleSaveEdit}
        message={message}
        handleCancelEdit={handleCancelEdit}
        editedMessage={editedMessage}
        setEditedMessage={setEditedMessage}
        setEditingPassword={setEditingPassword}
      />
    ) : (
      <View message={message} handleEditEntry={handleEditEntry} handleDeleteEntry={handleDeleteEntry} />
    );

  return (
    <MessageListBox>
      {messages.length
        ? messages.map((message: Message) => (
            <MessageItem key={message.id}>
              <UserContent>
                {renderMessageContent(message)}
                <PostTime>{displayCreatedAt(message.createdAt)}</PostTime>
              </UserContent>
            </MessageItem>
          ))
        : "응원 메시지가 없습니다"}
    </MessageListBox>
  );
};

export default MessageList;
