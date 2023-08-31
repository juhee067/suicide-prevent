import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { Btn, HighlightText } from "../../module/styled/styledFont";

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  padding: 15px 10px;
  border: none;
  border: 1px solid ${({ theme }) => theme.color.mainBlack};
`;

const Idbox = styled.div`
  margin-top: 40px;
`;

const Passwordbox = styled.div`
  margin-bottom: 20px;
`;

const ProcessBox = styled(FlexRowDiv)`
  max-width: 400px;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 1.3rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  gap: 5px;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input``;

const AutoLoginText = styled.div``;

const Register = styled.div`
  cursor: pointer;
`;

const SignUpBox = styled(HighlightText)`
  margin-left: 5px;
  text-underline-offset: 4px;
`;

const LoginBtn = styled(Btn)``;

const SignIn = ({ onLogin, onChange }: any) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(newChecked); // 부모 컴포넌트에 체크박스 상태 전달
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // 로그인 처리 로직을 여기에 추가
    if (username && password) {
      onLogin(username);
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Idbox>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
        />
      </Idbox>
      <Passwordbox>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
      </Passwordbox>
      <ProcessBox>
        <CheckboxLabel>
          <CheckboxInput type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <AutoLoginText>자동 로그인</AutoLoginText>
        </CheckboxLabel>
        <Register>
          <Link to="/auth">
            회원이 아니신가요?
            <SignUpBox showUnderline>회원가입</SignUpBox>
          </Link>
        </Register>
      </ProcessBox>
      <LoginBtn type="submit">로그인</LoginBtn>
    </Form>
  );
};

export default SignIn;
