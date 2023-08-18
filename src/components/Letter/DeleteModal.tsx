import React from "react";
import styled from "styled-components";
import { CenterAlign } from "../../module/styled/CenterAlignment";
import { FlexColumnCenterDiv } from "../../module/styled/FlexDiv";
import { Paragraph } from "../../module/styled/styledSpanagraph";
import { DocumentData, doc, deleteDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const ModalBackdrop = styled(FlexColumnCenterDiv)`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`;

const Modal = styled(CenterAlign)`
  width: 400px;
  height: 200px;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.color.mainWhite};
  z-index: 1000;
`;

const DeleteButtonBox = styled.div`
  * {
    padding: 10px 30px;
    border-radius: 5px;
    border: none;
    color: ${({ theme }) => theme.color.mainWhite};
    background-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const CancelBtn = styled.button`
  margin-right: 10px;
`;

const CheckBtn = styled.button``;

const EditingPasswordInput = styled.input`
  padding: 5px;
  width: 80%;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
  outline: none;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack}; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const ContentBox = styled(CenterAlign)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  z-index: 999;
`;

interface DeleteProps {
  selectedMessageId: string | null;
  setEditingPassword: React.Dispatch<React.SetStateAction<string>>;
  handleCancelDelete: () => void;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  messages: DocumentData;
  setMessages: React.Dispatch<React.SetStateAction<DocumentData[]>>;
  editingPassword: string;
}

const DeleteModal: React.FC<DeleteProps> = ({
  selectedMessageId,
  editingPassword,
  setEditingPassword,
  handleCancelDelete,
  setIsDeleteModalOpen,
  setMessages,
  messages,
}) => {
  const handleConfirmDelete = () => {
    const selectedMessage = messages.find((msg: { id: string | null }) => msg.id === selectedMessageId);

    if (selectedMessage && selectedMessage.password === editingPassword) {
      deleteUser(selectedMessageId);
      alert("게시물이 삭제되었습니다");
    } else {
      // 비밀번호가 일치하지 않을 때 처리
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  const deleteUser = async (id: string | null) => {
    // 비밀번호가 확인되고 게시물 삭제 로직 실행
    if (!id) {
      console.error("삭제할 게시물의 ID가 없습니다.");
      return;
    }
    const usersCollectionRef = collection(db, "users");
    try {
      await deleteDoc(doc(usersCollectionRef, id));
      // 삭제 후 게시물 목록 업데이트
      const updatedMessages = messages.filter((msg: { id: string }) => msg.id !== id);
      setMessages(updatedMessages);
      // 삭제 완료 후 모달 닫기
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("게시물 삭제 오류:", error);
    }
  };
  return (
    <ModalBackdrop>
      <Modal>
        <ContentBox>
          <Paragraph>메세지를 삭제하시겠습니까?</Paragraph>
          <EditingPasswordInput
            type="password"
            placeholder="비밀번호를 입력하세요"
            onChange={(e) => setEditingPassword(e.target.value)}
          />
          <DeleteButtonBox>
            <CancelBtn onClick={handleCancelDelete}>취소</CancelBtn>
            <CheckBtn onClick={handleConfirmDelete}>확인</CheckBtn>
          </DeleteButtonBox>
        </ContentBox>
      </Modal>
    </ModalBackdrop>
  );
};

export default DeleteModal;
