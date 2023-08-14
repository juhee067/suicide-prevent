import React from "react";
import styled from "styled-components";
import { CenterAlign } from "../styled/CenterAlignment";
import { FlexColumnCenterDiv } from "../styled/FlexDiv";
import { Paragraph } from "../styled/styledSpanagraph";

const ModalBackdrop = styled(FlexColumnCenterDiv)`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
`;

const Modal = styled(CenterAlign)`
  width: 400px;
  height: 200px;
  padding: 20px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  z-index: 1000;
`;

const DeleteButtonBox = styled.div`
  * {
    padding: 10px 30px;
    border-radius: 5px;
    border: none;
    background-color: #000;
    color: #fff;
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
  border: 1px solid #ccc;
  outline: none;
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border-color: #000000; /* 포커스된 상태일 때의 선 색상 변경 */
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
  setEditingPassword: React.Dispatch<React.SetStateAction<string>>;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}

const DeleteModal: React.FC<DeleteProps> = ({
  setEditingPassword,
  handleCancelDelete,
  handleConfirmDelete,
}) => {
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
