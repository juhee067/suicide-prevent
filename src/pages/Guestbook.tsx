import axios from "axios";
import React, { ReactNode, useEffect, useState } from "react";
import { FiDelete, FiEdit, FiSave, FiX } from "react-icons/fi";
import styled from "styled-components";
import { CenterAlign } from "../components/styled/CenterAlignment";
import { FlexColumnDiv, FlexRowDiv } from "../components/styled/FlexDiv";
import { H3, Paragraph } from "../components/styled/styledSpanagraph";
import { displayCreatedAt } from "../module/postTime";

import GuestbookForm from "../section/GuestbookForm";

const Modal = styled(CenterAlign)`
width: 30%;
height: 200px;
    padding: 20px;
    text-align: center;
    border-Radius: 5px;
    box-Shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    `;



const DeleteButtonBox = styled.div`
* {
  padding: 10px 30px;
  border-radius: 5px;
  border: none;
  background-color: #000;
  color:#fff;
}
`;

const CancelBtn = styled.button`
margin-right: 10px;
    `;

const CheckBtn = styled.button`
    `;

const GuestbookContainer = styled.div`
  max-width: 600px;
  margin: 100px auto;
  border-radius: 5px;

`;


const MessageList = styled.div` 
padding: 20px ;
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

const EditingBox = styled(FlexColumnDiv)`
padding:10px;
margin: 0 auto;
align-items: center;
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
const ContentBox = styled(CenterAlign)`
 display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  & ${EditingPasswordInput} {
  width: 80%;
  text-align: center;
  }
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
padding: 0 0 10px  10px;
font-size: 1rem;
font-weight: 300;
color: #909090;
`;


const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

const EditButton = styled.div`
  color: #b3b3b3;
  font-size: 1.8rem;
  margin-right: 10px;
  cursor: pointer;
`;

const SaveCancelButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SaveButton = styled.div`
  font-size: 1.8rem;
  cursor: pointer;
`;


const CancelButton = styled.div`
  color: #696969;
  font-size: 2rem;
 font-weight: 500;
  cursor: pointer;
`;


type Message = {
  id: number;
  author: string;
  title: string;
  message: string;
  password: string; // 추가
  createdAt: string; // 추가
};

const Guestbook = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedMessage, setEditedMessage] = useState("");
  const [editingPassword, setEditingPassword] = useState("");
  const [editingCreatedAt, setEditingCreatedAt] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // 모달 열림 상태
  const [selectedMessageId, setSelectedMessageId] = useState(null);

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
      const entryWithCreatedAt = {
        ...entry,
        createdAt: new Date(),
      };

      const response = await axios.post("http://localhost:3001/comments", entryWithCreatedAt);
      console.log("POST 요청 결과:", response.data);

      fetchMessages();
    } catch (error) {
      console.error("POST 요청 에러:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/comments/${selectedMessageId}`);
      const messageToDelete = response.data;

      if (editingPassword === messageToDelete.password) {
        const deleteResponse = await axios.delete(`http://localhost:3001/comments/${selectedMessageId}`);
        console.log('DELETE 요청 결과:', deleteResponse.data);
        fetchMessages();
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }

      setIsDeleteModalOpen(false);
      setSelectedMessageId(null);
      setEditingPassword('');
    } catch (error) {
      console.error('DELETE 요청 에러:', error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedMessageId(null);
  };

  const handleDeleteEntry = (id: any) => {
    setSelectedMessageId(id);
    setIsDeleteModalOpen(true);
  };
  
  const handleEditEntry = (editedMessage: Message) => {
    const { id, message, title, password, createdAt } = editedMessage;
    setEditingMessageId(id);
    setEditedMessage(message);
    setEditedTitle(title);
    setEditingPassword(password);
    setEditingCreatedAt(displayCreatedAt(createdAt))
  };
  

  const handleSaveEdit = async (id: number) => {
    try {
      // Get the message to be edited
      const response = await axios.get(`http://localhost:3001/comments/${id}`);
      const messageToEdit = response.data;
  
  // Check if the provided password matches the title's password
  if (editingPassword === messageToEdit.password) {
    // Passwords match, update the message content
    await axios.put(`http://localhost:3001/comments/${id}`, {
      message: editedMessage,
      title: editedTitle,
      password: editingPassword, // Include password in the PUT request
      createdAt: editingCreatedAt, // Include createdAt in the PUT request
    });
    setEditingMessageId(null);
    setEditedTitle("");
    setEditedMessage("");
    setEditingCreatedAt("");
    fetchMessages();
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("PUT 요청 에러:", error);
    }
  };
  

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditedMessage("");
    setEditingPassword(""); // Add this line
  setEditingCreatedAt(""); // Add this line
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
            {editingMessageId === message.id ? 
            ( <EditingTitle
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />): 
                <UserName>{message.title}</UserName>}        
              <UserActions>
                {editingMessageId === message.id ? (
                  <SaveCancelButton>
                    <SaveButton onClick={() => handleSaveEdit(message.id)}>
                      <FiSave />
                    </SaveButton>
                    <CancelButton onClick={handleCancelEdit}>
                      <FiX />
                    </CancelButton>
                  </SaveCancelButton>
                ) : (
                  <> 
                  <EditButton onClick={() => handleEditEntry(message)}>
                    <FiEdit />
                  </EditButton> 
                   <DeleteButton onClick={() => handleDeleteEntry(message.id)}>
                  <FiDelete /></DeleteButton>
                  </>
                 
                
                )}
              
              </UserActions>
            </UserBox>
            {editingMessageId === message.id ? (
              <EditingBox>
                <EditingTextarea
                  value={editedMessage}
                  onChange={(e) => setEditedMessage(e.target.value)}
                />
                <EditingPasswordInput
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  onChange={(e) => setEditingPassword(e.target.value)}
                />
              </EditingBox>
            ) : (
              <UserMessage>{message.message}</UserMessage>
            )}
            <PostTime>{displayCreatedAt(message.createdAt)}</PostTime>
          </UserContent>
        </MessageItem>
      ))}
    </>
    :"응원 메시지가 없습니다"}
  </MessageList>
  { isDeleteModalOpen?
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
      </Modal>:null}
  
    </GuestbookContainer>
  );
};

export default Guestbook;
