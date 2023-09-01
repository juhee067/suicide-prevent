import React from "react";
import styled from "styled-components";
import SignInForm from "../components/Auth/SignInForm";
import { CenterAlign } from "../module/styled/CenterAlignment";

import { Title } from "../module/styled/styledFont";

const AuthWrapper = styled.div`
  height: 100vh;
`;

const AuthBox = styled(CenterAlign)`
  padding: 60px;
  max-width: 400px;
  text-align: center;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const AuthTitle = styled(Title)`
  font-size: 4.5rem;
  font-weight: 900;
`;

const SignIn = () => {
  return (
    <AuthWrapper>
      <AuthBox>
        <AuthTitle> Hello!-Help! GateKeeper </AuthTitle>
        <SignInForm />
      </AuthBox>
    </AuthWrapper>
  );
};

export default SignIn;
