import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FlexRowDiv } from "../components/styled/FlexDiv";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 100px auto 50px;
  padding: 20px;
  border: 2px solid #000000;
  border-radius: 5px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const UserInfo = styled(FlexRowDiv)`
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Inner = styled.div`
  position: relative;
  width: 49%;
`;

const Label = styled.label`
  font-size: 11px;
  color: #aaa;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s;
`;

const Input = styled.input`
  color: #fff;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px 10px 0 10px;
  font-size: 16px;
  transition: all 0.3s;
  outline: none;
  &:hover {
    border: 1px solid #000000;
  }
  &:focus {
    border-color: #000000; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const ContentBox = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
  width: 100%;
  height: 100px;
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
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const boardRef = useRef(null);
  const inputListRef = useRef([]);
  const getPassRef = useRef(null);
  const getNameRef = useRef(null);
  const getContentsRef = useRef(null);
  const resultDataRef = useRef(null);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (author && password && message) {
      const entry = { author, password, message };
      onAddEntry(entry);
      setAuthor("");
      setPassword("");
      setMessage("");
    }
  };

  return (
    <FormContainer>
      <Title>응원의 메세지</Title>
      <Form onSubmit={handleSubmit}>
        <UserInfo>
          <Inner>
            <Label>작성자</Label>
            <Input
              type="text"
              ref={getNameRef}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Inner>
          <Inner>
            <Label>비밀번호</Label>
            <Input
              type="text"
              ref={getPassRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
