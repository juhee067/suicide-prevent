import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { db, loginEmail } from "../../firebaseConfig";
import { Btn, HighlightText } from "../../module/styled/styledFont";
import { setUserLoginAccessTokenSlice } from "../../store/reducer/userData/userData/userLoginAccessTokenSlice";
import { setUserLoginDataSlice } from "../../store/reducer/userData/userData/userLoginDataSlice";

// import { login } from "../../module/tokenManager";

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
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const userEmail = `${userId}@myapp.com`;
    try {
      const result = await loginEmail(userEmail, password);
      const user = result.user;
      if (user) {
        const idToken = await user.getIdToken();
        // Firestore 쿼리 생성
        const q = query(collection(db, "nickName"), where("email", "==", userEmail));

        // Firestore에서 유저의 닉네임 조회
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // 첫 번째 문서의 닉네임을 가져옴
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          const nickName = userData.nickname;

          // idToken 및 닉네임과 함께 상태에 저장
          dispatch(
            setUserLoginDataSlice({ uid: user.uid, userEmail, authToken: idToken, nickName: nickName })
          );
          dispatch(setUserLoginAccessTokenSlice({ authToken: idToken }));
        } else {
          console.log("해당 이메일 주소의 닉네임을 찾을 수 없습니다.");
        }

        alert("로그인되었습니다.");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <Idbox>
        <Input
          type="text"
          id="username"
          value={userId}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setUserId(e.target.value)
          }
          placeholder="아이디"
        />
      </Idbox>
      <Passwordbox>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setPassword(e.target.value)
          }
          placeholder="비밀번호"
        />
      </Passwordbox>
      <ProcessBox>
        <CheckboxLabel>
          <CheckboxInput type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
          <AutoLoginText>자동 로그인</AutoLoginText>
        </CheckboxLabel>
      </ProcessBox>
      <SignInBtn type="submit">로그인</SignInBtn>
      <Register>
        <Link to="/auth/signUp">
          회원이 아니신가요?
          <SignUpBox $showunderline={true}>회원가입</SignUpBox>
        </Link>
      </Register>
    </Form>
  );
};

export default SignInForm;
