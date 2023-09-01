import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Btn, HighlightText, Paragraph } from "../../module/styled/styledFont";

// 이메일 정규식 : 영문자와 숫자만
const regexID = /^[a-zA-Z0-9]{3,16}$/;
// 비밀번호 형식
const regexPass = /^[a-zA-Z가-힣!@#$%^&*()_+|<>?:{}]*.{5,16}$/;
//  닉네임 형식
const regexNickname = /^[가-힣a-zA-Z0-9]{2,10}$/;

const Form = styled.form`
  border-radius: 5px;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  margin-bottom: 10px;
  padding: 15px 10px;
  border: none;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
  border-radius: 5px;
  outline: none;
  &::placeholder {
    color: ${({ theme }) => theme.color.mainGray};
  }
  &:focus {
    border-color: ${({ theme }) => theme.color.mainBlack}; /* 포커스된 상태일 때의 선 색상 변경 */
  }
`;

const Nicknamebox = styled.div`
  margin-top: 40px;
`;

const Idbox = styled.div``;

const Passwordbox = styled.div`
  margin-bottom: 20px;
`;

const Register = styled.div`
  font-size: 1.2rem;
  cursor: pointer;
`;

const SigninBox = styled(HighlightText)`
  margin-left: 5px;
  text-underline-offset: 4px;
`;

const SignUpBtn = styled(Btn)`
  margin-bottom: 20px;
`;

const ErrorTextBox = styled.div`
  margin-bottom: 10px;
  margin-left: 5px;
  text-align: left;
`;

const ErrorText = styled(Paragraph)`
  color: ${({ theme }) => theme.color.mainRed};
  font-size: 1rem;
`;

const initialIdNotice = {
  alert: false,
  message: "",
};

const SignUpForm = ({ onLogin, onChange }: any) => {
  const [nickName, setNickName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [nickNameNotice, setNicknameNotice] = useState(initialIdNotice);
  const [idNotice, setIdNotice] = useState(initialIdNotice);
  const [passNotice, setPassNotice] = useState(initialIdNotice);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // nickname input 유효성 검사
  const onBlurNicknameHandler = async () => {
    if (nickName === "") {
      setNicknameNotice({ message: "필수항목입니다.", alert: false });
      return;
    }
  };

  const onChangeNicknameHandler = async (e: { target: { value: React.SetStateAction<string> } }) => {
    setNickName(e.target.value);
    const isValidNickname = regexNickname.test(nickName);
    if (!isValidNickname) {
      setNicknameNotice({
        message: "3 ~ 10자의 한글, 영문, 숫자 조합으로 입력해야 합니다.",
        alert: false,
      });
      return;
    }
    setNicknameNotice({
      message: "",
      alert: true,
    });
  };

  // userId input 유효성 검사
  const onBlurIdHandler = () => {
    if (userId === "") {
      setIdNotice({ message: "필수항목입니다.", alert: false });
      return;
    }
  };

  const onChangeIdHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setUserId(e.target.value);
    const isValidID = regexID.test(userId);
    if (!isValidID) {
      setIdNotice({
        message: "4 ~ 16자의 영문, 숫자 조합으로 입력해야 합니다.",
        alert: false,
      });
      return;
    }
    setIdNotice({
      message: "",
      alert: true,
    });
  };

  // password input 유효성 검사
  const onBlurPasswordHandler = () => {
    if (password === "") {
      setPassNotice({ message: "필수항목입니다.", alert: false });
      return;
    }
  };

  const onChangePasswordHandler = (e: { target: { value: React.SetStateAction<string> } }) => {
    setPassword(e.target.value);
    const isValidPassword = regexPass.test(password);
    if (!isValidPassword) {
      setPassNotice({
        message: "한글을 제외한 6 ~ 16자의 문자로 입력해야 합니다.",
        alert: false,
      });
      return;
    }
    setPassNotice({
      message: "",
      alert: true,
    });
  };

  const auth = getAuth();
  const db = getFirestore();

  const handleSubmitSignUp = async (
    e: { preventDefault: any },
    userId: string,
    password: string,
    nickName: string
  ) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, `${userId}@myapp.com`, password);
      const user = userCredential.user;

      // 사용자 정보를 Firestore에 저장
      await setDoc(doc(db, "nickName", user.uid), {
        email: `${userId}@myapp.com`,
        nickname: nickName,
      });
      alert("회원가입이 완료되었습니다.");
      navigate("/auth/signIn");
      console.log("회원가입 성공:", user);
      setError("");
      // 회원가입 성공 시에 원하는 동작을 추가해주세요.
    } catch (error) {
      console.error("회원가입 실패:", error.message);
      setError(error.message);
    }
  };

  return (
    <Form
      onSubmit={(e: { preventDefault: () => void }) => handleSubmitSignUp(e, userId, password, nickName)}
    >
      <Nicknamebox>
        <Input
          type="text"
          value={nickName}
          minLength={3}
          maxLength={10}
          onChange={onChangeNicknameHandler}
          onBlur={onBlurNicknameHandler}
          placeholder="닉네임"
        />
        <ErrorTextBox>
          {nickNameNotice.alert ? null : <ErrorText>{nickNameNotice.message}</ErrorText>}
        </ErrorTextBox>
      </Nicknamebox>
      <Idbox>
        <Input
          type="text"
          id="userId"
          value={userId}
          minLength={4}
          maxLength={16}
          onChange={onChangeIdHandler}
          onBlur={onBlurIdHandler}
          placeholder="아이디"
        />
        <ErrorTextBox>{idNotice.alert ? null : <ErrorText>{idNotice.message}</ErrorText>}</ErrorTextBox>
      </Idbox>
      <Passwordbox>
        <Input
          type="password"
          id="password"
          value={password}
          minLength={4}
          maxLength={16}
          onBlur={onBlurPasswordHandler}
          onChange={onChangePasswordHandler}
          placeholder="비밀번호"
        />
        <ErrorTextBox>
          {passNotice.alert ? null : <ErrorText>{passNotice.message}</ErrorText>}
        </ErrorTextBox>
      </Passwordbox>
      <SignUpBtn type="submit">회원가입</SignUpBtn>
      <Register>
        <Link to="/auth/signIn">
          이미 회원이신가요?
          <SigninBox showunderline>로그인</SigninBox>
        </Link>
      </Register>
    </Form>
  );
};

export default SignUpForm;
