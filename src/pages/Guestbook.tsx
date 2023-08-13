import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import styled from "styled-components";
import { FlexRowDiv } from "../components/styled/FlexDiv";
import { Paragraph } from "../components/styled/styledSpanagraph";
import GuestbookForm from "../section/GuestbookForm";

const GuestbookContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  border-radius: 5px;

`;
const MessageList = styled.div` 
padding: 20px;
border-radius: 5px;
border:2px solid #4a4a4a;
background-color: #fbfbfb;
`;

const MessageItem = styled(FlexRowDiv)`
  margin-bottom: 15px ;
  justify-content: space-between;
  border: 1px solid #4a4a4a;
  border-radius: 5px;
  background-color: #fff;
`;

const DeleteButton = styled.div`
color: #b3b3b3;
font-size:1.8rem;
`;

const UserContent = styled.div`
width: 100%;
`;

const UserBox = styled(FlexRowDiv)`
padding: 10px;
justify-content: space-between;
align-items: center;
 border-bottom: 1px solid #cfcfcf;
`;

const UserName = styled.div`
font-size: 1.2rem;
font-weight: 700;
 
`;

const UserMessage = styled(Paragraph)`
padding: 10px;
font-size: 2rem;
font-weight: 300;

`;

const PostTime = styled.div`
padding: 10px;
font-size: 1rem;
font-weight: 300;
color: #909090;
`;

type Message = {
  id: number;
  author: string;
  message: string;
};

const Guestbook = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3001/comments");
      setMessages(response.data.reverse());
      console.log(response.data)
    } catch (error) {
      console.error("GET 요청 에러:", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleAddEntry = async (entry: any) => {
    try {
      const response = await axios.post("http://localhost:3001/comments", entry);
      console.log("POST 요청 결과:", response.data);

      fetchMessages();
    } catch (error) {
      console.error("POST 요청 에러:", error);
    }
  };

  const handleDeleteEntry = async (id: any) => {
    try {
      const response = await axios.delete(`http://localhost:3001/comments/${id}`);
      console.log("DELETE 요청 결과:", response.data);
alert("응원의 메세지를 삭제하시겠습니까?")
      fetchMessages();
    } catch (error) {
      console.error("DELETE 요청 에러:", error);
    }
  };

  return (
 
    <GuestbookContainer>
      <GuestbookForm onAddEntry={handleAddEntry} />
      <MessageList>
      {messages.length ?
      <> 
      {messages.map((message: Message) => (
          <MessageItem key={message.id}>
            <UserContent>
              <UserBox>
              <UserName>{message.author}</UserName>
              <DeleteButton onClick={() => handleDeleteEntry(message.id)}>
              <FiDelete/>
              </DeleteButton>
              </UserBox>
            <UserMessage>{message.message}</UserMessage>
            <PostTime>10분전</PostTime>
            </UserContent>
          </MessageItem>
        ))}</>
        :"응원 메시지가 없습니다"}
       
      </MessageList>
    </GuestbookContainer>
  );
};

export default Guestbook;
