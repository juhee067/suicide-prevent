import React, { useState } from "react";
import styled from "styled-components";
import { Paragraph } from "../components/styled/styledSpanagraph";
import GuestbookForm from "../section/GuestbookForm";

const GuestbookContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border-radius: 5px;
`;

const Entry = styled.div`
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;
const UserName = styled.div`
  margin-bottom: 10px;
`;

const Guestbook = () => {
  const [entries, setEntries] = useState([]);

  const handleAddEntry = (entry: never) => {
    setEntries([...entries, entry]);
  };

  return (
    <GuestbookContainer>
      <GuestbookForm onAddEntry={handleAddEntry} />
      {entries.map((entry, index) => (
        <Entry key={index}>
          <UserName>작성자: 22</UserName>
          <Paragraph>11</Paragraph>
        </Entry>
      ))}
    </GuestbookContainer>
  );
};

export default Guestbook;
