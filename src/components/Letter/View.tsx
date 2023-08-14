import React from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../styled/FlexDiv";
import { Paragraph } from "../styled/styledSpanagraph";
import { FiDelete, FiEdit } from "react-icons/fi";

const ViewBox = styled.div``;
const UserBox = styled(FlexRowDiv)`
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const UserTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;
const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b3b3b3;
  font-size: 1.8rem;
  cursor: pointer;
`;

const UserMessage = styled(Paragraph)`
  padding: 10px;
  line-height: 1.2;
  font-size: 2rem;
  font-weight: 300;
`;

interface ViewProps {
  message: any;
  handleEditEntry: (message: any) => void;
  handleDeleteEntry: (id: number) => void;
}
const View: React.FC<ViewProps> = ({ message, handleEditEntry, handleDeleteEntry }) => {
  return (
    <ViewBox>
      <UserBox>
        <UserTitle>{message.title}</UserTitle>
        <UserActions>
          <FiEdit onClick={() => handleEditEntry(message)} />
          <FiDelete onClick={() => handleDeleteEntry(message.id)} />
        </UserActions>
      </UserBox>

      <UserMessage>{message.message}</UserMessage>
    </ViewBox>
  );
};

export default View;
