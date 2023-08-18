import React, { useState } from "react";
import styled from "styled-components";
import { Message } from "../../module/MessageType";
import { displayCreatedAt } from "../../module/postTime";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import EditionForm from "./EditionForm";
import View from "./View";
import { DocumentData, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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
  messages: DocumentData[];
  setSelectedMessageId: React.Dispatch<React.SetStateAction<number | null>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingPassword: React.Dispatch<React.SetStateAction<string>>;
  editingPassword: string;
  uniqueId: string;
  usersCollectionRef: any;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  setSelectedMessageId,
  setIsDeleteModalOpen,
  setEditingPassword,
  editingPassword,
  uniqueId,
  usersCollectionRef,
}) => {
  const [editedTitle, setEditedTitle] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingCreatedAt, setEditingCreatedAt] = useState("");

  // 업데이트 - U
  const handleSaveEdit = async (id: string) => {
    try {
      // 선택한 아이디에 해당하는 문서 가져오기

      const userDoc = doc(db, "users", id);
      const data = await getDoc(userDoc);
      if (data.exists()) {
        const userData = data.data();
        console.log(userData.password);
        // 선택한 게시물의 패스워드와 입력한 패스워드 비교
        if (userData && editingPassword !== userData.password) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }

        // 나머지 업데이트 작업 수행
        await updateDoc(userDoc, {
          title: editedTitle,
          message: editedMessage,
          createdAt: editingCreatedAt,
        });

        setEditingCreatedAt("");
        setEditingPassword("");
        alert("게시물이 수정되었습니다.");
        setEditingMessageId(null);
      } else {
        alert("선택한 게시물을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDeleteEntry = (id: any) => {
    setSelectedMessageId(id);
    setIsDeleteModalOpen(true);
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
        ? messages.reverse().map((message: Message) => (
            <MessageItem>
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
