import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputField from "../components/Letter/InputField";
import { FlexRowDiv } from "../module/styled/FlexDiv";
import { collection, getDocs, DocumentData, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto 20px;
  padding: 15px 20px;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  border-radius: 5px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled(FlexRowDiv)`
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ContentBox = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  width: 100%;
  height: 50px;
  font-size: 1.3rem;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  border-radius: 5px;
  resize: none;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.color.mainGray};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack}; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const Button = styled.button`
  width: 20%;
  padding: 10px 15px;
  font-size: 1.3rem;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.mainBlack};
  color: ${({ theme }) => theme.color.mainWhite};
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

interface FormProps {
  createUsers: any;
  newTitle: any;
  newPassword: any;
  newMessage: any;
  setNewTitle: any;
  setNewPassword: any;
  setNewMessage: any;
}
const GuestbookForm: React.FC<FormProps> = ({
  createUsers,
  newTitle,
  newPassword,
  newMessage,
  setNewTitle,
  setNewPassword,
  setNewMessage,
}) => {
  const [titleFocused, setTitleFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTitle && newPassword && newMessage) {
      // createUsers 함수를 호출하여 데이터베이스에 저장
      createUsers();

      // 입력 필드 초기화
      setNewTitle("");
      setNewPassword("");
      setNewMessage("");
    }
  };

  const handleNameBlur = () => {
    if (!newTitle) {
      setTitleFocused(false);
    }
  };

  const handlePasswordBlur = () => {
    if (!newPassword) {
      setPassFocused(false);
    }
  };

  return (
    <FormContainer>
      <Title>응원의 메세지</Title>
      <Form onSubmit={handleSubmit}>
        <UserInfo>
          <InputField
            label="제목"
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onFocus={() => setTitleFocused(true)}
            onBlur={handleNameBlur}
            focused={titleFocused}
          />
          <InputField
            label="비밀번호"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onFocus={() => setPassFocused(true)}
            onBlur={handlePasswordBlur}
            focused={passFocused}
          />
        </UserInfo>
        <ContentBox>
          <TextArea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="응원메세지"
          />
        </ContentBox>
        <Button type="submit">작성하기</Button>
      </Form>
    </FormContainer>
  );
};

export default GuestbookForm;
