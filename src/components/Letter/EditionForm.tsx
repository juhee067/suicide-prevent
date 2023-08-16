import React from "react";
import styled from "styled-components";
import { FlexColumnDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { FiSave, FiX } from "react-icons/fi";
import { Message } from "../../module/MessageType";
import { DocumentData } from "firebase/firestore";

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
  border: 1px solid ${({ theme }) => theme.color.mainGray};

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const EditingTextarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  resize: none;
  transition: all 0.3s;
  outline: none;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
  }
`;

const EditingPasswordInput = styled.input`
  padding: 5px;
  width: 30%;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  outline: none;

  &:hover {
    border: 1px solid ${({ theme }) => theme.color.mainBlack};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack};
  }
`;

const UserActions = styled(FlexRowDiv)`
  gap: 10px;
  color: ${({ theme }) => theme.color.mainGray};
  font-size: 2rem;
  cursor: pointer;
`;

interface EditionProps {
  editedTitle: string;
  setEditedTitle: React.Dispatch<React.SetStateAction<string>>;
  handleSaveEdit: (id: string) => void;
  handleCancelEdit: () => void;
  editedMessage: string;
  setEditedMessage: React.Dispatch<React.SetStateAction<string>>;
  setEditingPassword: React.Dispatch<React.SetStateAction<string>>;
  message: DocumentData;
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
