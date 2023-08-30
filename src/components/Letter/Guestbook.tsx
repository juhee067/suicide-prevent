import React, { useEffect, useId, useState } from "react";
import styled from "styled-components";
import { CenterAlign } from "../../module/styled/CenterAlignment";
import { db } from "../../firebaseConfig";
import GuestbookForm from "../../section/GuestbookForm";
import MessageList from "./MessageList";
import DeleteModal from "./DeleteModal";
// 파이어베이서 파일에서 import 해온 db

import { collection, getDocs, DocumentData, addDoc } from "firebase/firestore";

const GuestbookContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 52px auto 0;
  margin-top: 52px;
  height: calc(100vh - 52px);
  border-radius: 5px;
`;

const GuestbookBox = styled(CenterAlign)`
  width: 50%;
  margin-top: 20px;
  background-color: #ff0;
  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

const WomanImg = styled.img`
  width: 100%;
  max-width: 220px;
  position: absolute;
  bottom: 10%;
  left: -45%;
  @media screen and (max-width: 900px) {
    width: 50%;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const ManImg = styled.img`
  width: 100%;
  max-width: 220px;
  position: absolute;
  bottom: 10%;
  right: -45%;

  @media screen and (max-width: 900px) {
    width: 50%;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Guestbook: React.FC = () => {
  const [editingPassword, setEditingPassword] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 모달 열림 상태
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const [messages, setMessages] = useState<DocumentData[]>([]);

  const [newTitle, setNewTitle] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const usersCollectionRef = collection(db, "users");

  const uniqueId = useId();

  useEffect(() => {
    const usersCollectionRef = collection(db, "users");

    // 비동기로 데이터 받을준비
    const getUsers = async () => {
      // getDocs로 컬렉션안에 데이터 가져오기
      const data = await getDocs(usersCollectionRef);

      // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
      setMessages(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, [messages]);

  const createUsers = async () => {
    try {
      // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
      await addDoc(usersCollectionRef, {
        uniqueId: uniqueId,
        title: newTitle,
        password: newPassword,
        message: newMessage,
        createdAt: new Date().toISOString(), // 추가: 현재 시간을 기록
      });

      // 데이터를 추가한 후, 상태 초기화
      setNewTitle("");
      setNewPassword("");
      setNewMessage("");
      console.log("데이터 전달");
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    // setSelectedMessageId(null);
  };

  return (
    <GuestbookContainer>
      {isDeleteModalOpen && (
        <DeleteModal
          selectedMessageId={selectedMessageId}
          setEditingPassword={setEditingPassword}
          handleCancelDelete={handleCancelDelete}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          messages={messages}
          editingPassword={editingPassword}
          setMessages={setMessages}
          // handleConfirmDelete={handleConfirmDelete}
        />
      )}
      <GuestbookBox>
        <WomanImg src={`${process.env.PUBLIC_URL}/images/letterAiwoman.png`} />
        {/* 방명록 작성 폼 */}

        <GuestbookForm
          // onAddEntry={handleAddEntry}
          createUsers={createUsers}
          newTitle={newTitle}
          newPassword={newPassword}
          newMessage={newMessage}
          setNewTitle={setNewTitle}
          setNewPassword={setNewPassword}
          setNewMessage={setNewMessage}
        />
        {/* 방명록 리스트 */}
        <MessageList
          messages={messages}
          setSelectedMessageId={setSelectedMessageId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setEditingPassword={setEditingPassword}
          editingPassword={editingPassword}
          uniqueId={uniqueId}
          usersCollectionRef={usersCollectionRef}
          // fetchMessages={fetchMessages}
        />
        {/* 삭제 모달창  */}
        <ManImg src={`${process.env.PUBLIC_URL}/images/letterAiman.png`} />
      </GuestbookBox>
    </GuestbookContainer>
  );
};

export default Guestbook;
