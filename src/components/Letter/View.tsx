import React from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Paragraph } from "../../module/styled/styledSpanagraph";
import { FiDelete, FiEdit } from "react-icons/fi";
import { Message } from "../../module/MessageType";

const ViewBox = styled.div``;

const UserBox = styled(FlexRowDiv)`
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.color.mainGray};
`;

const UserTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  @media screen and (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const UserActions = styled(FlexRowDiv)`
  gap: 10px;
  color: ${({ theme }) => theme.color.mainGray};
  font-size: 1.8rem;
  cursor: pointer;
`;

const UserMessage = styled(Paragraph)`
  padding: 10px;
  line-height: 1.2;
  font-size: 1.5rem;
  font-weight: 300;
  @media screen and (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

interface ViewProps {
  message: Message;
  handleEditEntry: (message: Message) => void;
  handleDeleteEntry: (id: string) => void;
}

const View: React.FC<ViewProps> = ({ message, handleEditEntry, handleDeleteEntry }) => {
  return (
    <ViewBox>
      <UserBox>
        <UserTitle>{message.title}</UserTitle>
        <UserActions>
          <FiEdit onClick={() => handleEditEntry(message)} />
          <FiDelete
            onClick={() => {
              handleDeleteEntry(message.id);
            }}
          />
        </UserActions>
      </UserBox>
      <UserMessage>{message.message}</UserMessage>
    </ViewBox>
  );
};

export default View;
