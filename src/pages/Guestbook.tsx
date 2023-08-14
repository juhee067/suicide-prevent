import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CenterAlign } from "../components/styled/CenterAlignment";

import GuestbookForm from "../section/GuestbookForm";
import MessageList from "../components/Letter/MessageList";
import DeleteModal from "../components/Letter/DeleteModal";

const GuestbookContainer = styled.div`
  position: relative;
  margin-top: 52px;
  height: calc(100vh - 52px);
  border-radius: 5px;
`;

const GuestbookBox = styled(CenterAlign)`
  margin-top: 20px;
  max-width: 600px;
`;

type Message = {
  id: number;
  author: string;
  title: string;
  message: string;
  password: string;
  createdAt: string;
};

const Guestbook: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingPassword, setEditingPassword] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 모달 열림 상태
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/comments");
      setMessages(response.data.reverse());
    } catch (error) {
      console.error("GET 요청 에러:", error);
    }
  };

  const handleAddEntry = async (entry: any) => {
    try {
      const entryWithCreatedAt = {
        ...entry,
        createdAt: new Date().toISOString(),
      };
      await axios.post("http://localhost:3001/comments", entryWithCreatedAt);

      fetchMessages();
    } catch (error) {
      console.error("POST 요청 에러:", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!editingPassword) {
      alert("비밀번호를 입력해주세요");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3001/comments/${selectedMessageId}`);
      const messageToDelete = response.data;

      if (editingPassword === messageToDelete.password) {
        await axios.delete(`http://localhost:3001/comments/${selectedMessageId}`);
        alert("게시물이 삭제되었습니다");
        fetchMessages();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      setIsDeleteModalOpen(false);
      setSelectedMessageId(null);
      setEditingPassword("");
    } catch (error) {
      console.error("DELETE 요청 에러:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedMessageId(null);
  };

  return (
    <GuestbookContainer>
      <GuestbookBox>
        {/* 방명록 작성 폼 */}
        <GuestbookForm onAddEntry={handleAddEntry} />
        {/* 방명록 리스트 */}
        <MessageList
          messages={messages}
          setSelectedMessageId={setSelectedMessageId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setEditingPassword={setEditingPassword}
          editingPassword={editingPassword}
          fetchMessages={fetchMessages}
        />
        {/* 삭제 모달창  */}
        {isDeleteModalOpen && (
          <DeleteModal
            setEditingPassword={setEditingPassword}
            handleCancelDelete={handleCancelDelete}
            handleConfirmDelete={handleConfirmDelete}
          />
        )}
      </GuestbookBox>
    </GuestbookContainer>
  );
};

export default Guestbook;
