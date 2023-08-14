import React from "react";
import styled from "styled-components";
import { FlexColumnDiv, FlexRowDiv } from "../styled/FlexDiv";
import { FiSave, FiX } from "react-icons/fi";

const EditingBox = styled(FlexColumnDiv)`
  padding: 10px;
  margin: 0 auto;
`;
const UserEditingBox = styled(FlexRowDiv)`
  justify-content: space-between;
  margin-bottom: 10px;
`;

const EditingTitle = styled.input`
  width: 50%;
  padding: 10px;
  outline: none;
  border: 1px solid #ccc;
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border-color: #000000; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const EditingTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid #cfcfcf;
  resize: none;
  transition: all 0.3s;
  outline: none;
  &:hover {
    border: 1px solid #000000;
  }
  &:active {
    border: 1px solid #000000;
  }
`;

const EditingPasswordInput = styled.input`
  padding: 5px;
  width: 30%;
  border: 1px solid #ccc;
  outline: none;
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border-color: #000000; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b3b3b3;
  font-size: 1.8rem;
  cursor: pointer;
`;

interface EditionProps {
  editedTitle: any;
  setEditedTitle: any;
  handleSaveEdit: any;
  handleCancelEdit: any;
  editedMessage: any;
  setEditedMessage: any;
  setEditingPassword: any;
  message: any;
}

const EditionForm: React.FC<EditionProps> = ({
  editedTitle,
  setEditedTitle,
  handleSaveEdit,
  handleCancelEdit,
  editedMessage,
  setEditedMessage,
  setEditingPassword,
  message,
}) => {
  return (
    <EditingBox>
      <UserEditingBox>
        <EditingTitle value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
        <UserActions>
          <FiSave onClick={() => handleSaveEdit(message.id)} />
          <FiX onClick={handleCancelEdit} />
        </UserActions>
      </UserEditingBox>
      <EditingTextarea value={editedMessage} onChange={(e) => setEditedMessage(e.target.value)} />
      <EditingPasswordInput
        type="password"
        placeholder="비밀번호를 입력하세요"
        onChange={(e) => setEditingPassword(e.target.value)}
      />
    </EditingBox>
  );
};

export default EditionForm;
