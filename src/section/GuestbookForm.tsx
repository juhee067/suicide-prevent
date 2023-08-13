import axios from "axios";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../components/styled/FlexDiv";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 100px auto 20px;
  padding: 15px 20px;
  border: 2px solid #000000;
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

const Inner = styled.div`
  position: relative;
  width: 49%;
`;

const Input = styled.input`
  padding: 0 10px ;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  border: 1px solid #ddd;
  color: #000000;
  font-size: 16px;
  transition: all 0.3s;
  outline: none;

  &:hover {
    border: 1px solid #000000;
  }
`;

const Label = styled.label<{ focused: boolean }>`
  font-size: 11px;
  color: #aaa;
  position: absolute;
  left: 10px;
  top: ${({ focused }) => (focused ? "-30%" : "50%")};
  transform: translateY(-50%);
  transition: all 0.3s;

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
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  outline: none;
  &::placeholder {
    color: #aaa;
  }
  &:focus {
    border-color: #000000; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const Button = styled.button`
  width: 20%;
  padding: 10px 15px;
  font-size: 1.3rem;
  margin: 0 auto;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const GuestbookForm = ({ onAddEntry }: any) => {
  const [title, seTtitle] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [nameFocused, setNameFocused] = useState(false);
  const [passFocused, setPassFocused] = useState(false);

  const getPassRef = useRef<HTMLInputElement | null>(null);
  const getNameRef = useRef<HTMLInputElement | null>(null);
  const getContentsRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (title && password && message) {
      const entry = { title, password, message };

      try {
        // const response = await axios.post("http://localhost:3001/comments", entry);
        // console.log("POST 요청 결과:", response.data);

        onAddEntry(entry);
        seTtitle("");
        setPassword("");
        setMessage("");
      } catch (error) {
        console.error("POST 요청 에러:", error);
      }
    }
  };

  const handleNameBlur = () => {
    if (!title) {
      setNameFocused(false);
    }
  };
  const handlePasswordBlur = () => {
    if (!password) {
      setPassFocused(false);
    }
  };
  return (
    <FormContainer>
      <Title>응원의 메세지</Title>
      <Form onSubmit={handleSubmit}>
        <UserInfo>
          <Inner>
            <Label htmlFor="title" focused={nameFocused}>
              제목
            </Label>
            <Input
              type="text"
              id="title"
              ref={getNameRef}
              value={title}
              onChange={(e) => seTtitle(e.target.value)}
              onFocus={() => setNameFocused(true)}
              onBlur={handleNameBlur}
            />
          </Inner>
          <Inner>
            <Label htmlFor="pass" focused={passFocused}>
              비밀번호
            </Label>
            <Input
              type="password"
              id="pass"
              ref={getPassRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPassFocused(true)}
              onBlur={handlePasswordBlur}
            />
          </Inner>
        </UserInfo>

        <ContentBox>
          <TextArea
            value={message}
            ref={getContentsRef}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="응원메세지"
          />
        </ContentBox>

        <Button type="submit">작성하기</Button>
      </Form>
    </FormContainer>
  );
};

export default GuestbookForm;
