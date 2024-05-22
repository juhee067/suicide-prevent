import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../firebaseConfig';
import { Btn, HighlightText } from '../../module/styled/styledFont';
import { setUserLoginDataSlice } from '../../redux/auth/userLoginDataSlice';

const Form = styled.form``;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  padding: 15px 10px;
  border: none;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.color.mainGray};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack}; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const Idbox = styled.div`
  margin-top: 40px;
`;

const Passwordbox = styled.div``;

const ProcessBox = styled.div`
  max-width: 400px;
  width: 100%;
  margin-bottom: 30px;
  font-size: 1.3rem;
`;

const CheckboxLabel = styled.label`
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CheckboxInput = styled.input``;

const AutoLoginText = styled.div``;

const Register = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const SignUpBox = styled(HighlightText)`
  margin-left: 5px;
  text-underline-offset: 4px;
`;

const SignInBtn = styled(Btn)`
  margin-bottom: 20px;
`;

const SignInForm = () => {
  const [userId, setUserId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let email = `${userId}@myapp.com`;
    try {
      let persistence = isChecked ? browserLocalPersistence : browserSessionPersistence;
      // 먼저 인증 상태 지속성을 설정합니다.
      await setPersistence(auth, persistence);
      await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUserLoginDataSlice(true));
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Idbox>
        <Input
          type='text'
          id='username'
          value={userId}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUserId(e.target.value)
          }
          placeholder='아이디'
        />
      </Idbox>
      <Passwordbox>
        <Input
          type='password'
          id='password'
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
          placeholder='비밀번호'
        />
      </Passwordbox>
      <ProcessBox>
        <CheckboxLabel>
          <CheckboxInput type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
          <AutoLoginText>자동 로그인</AutoLoginText>
        </CheckboxLabel>
      </ProcessBox>
      <SignInBtn type='submit'>로그인</SignInBtn>
      <Register>
        <Link to='/auth/signUp'>
          회원이 아니신가요?
          <SignUpBox $showunderline={true}>회원가입</SignUpBox>
        </Link>
      </Register>
    </Form>
  );
};

export default SignInForm;
