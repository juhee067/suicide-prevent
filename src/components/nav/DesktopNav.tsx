import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FlexRowDiv } from "../../module/styled/FlexDiv";
import { FaRegWindowMaximize } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const DesktopNavBox = styled(FlexRowDiv)`
  padding: 0 20px;
  position: fixed;
  top: 0;
  justify-content: space-between;
  width: 100%;
  z-index: 1000;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  border-right: none;
  border-left: 0;
  background-color: ${({ theme }) => theme.color.mainWhite};
  font-size: 1.8em;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Menus = styled(FlexRowDiv)``;

const MovePage = styled(Link)`
  padding: 15px 20px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  font-family: KyoboHandwriting2022khn;
  font-size: 2rem;
  &.active {
    background-color: ${({ theme }) => theme.color.mainBlack};
    color: ${({ theme }) => theme.color.mainWhite};
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
    color: ${({ theme }) => theme.color.mainWhite};
  }

  @media screen and (max-width: 768px) {
    padding: 10px 15px;
  }
`;

const RightBox = styled(FlexRowDiv)`
  align-items: center;
  gap: 20px;
  font-family: KyoboHandwriting2022khn;
`;

const IconBox = styled(FlexRowDiv)`
  gap: 15px;
  align-items: center;
  font-size: 2.3rem;
`;

const Login = styled.div`
  font-size: 2rem;
`;

const Logout = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;

const DesktopNav = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>();
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation(); // 현재 URL 경로를 가져오기 위한 Hook
  const [isLoading, setIsLoading] = useState(true);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  const menuItems = [
    { to: "/", label: "홈" },
    { to: "/test", label: "진단" },
    { to: "/letter", label: "편지" },
    { to: "/post", label: "게시판" },
    { to: "/Chatting", label: "채팅" },
    { to: "/information", label: "정보" },
  ];

  const handleLogIn = () => {
    setSelectedMenu(undefined);
  };

  useEffect(() => {
    const pathname = location.pathname;
    const matchingIndex = menuItems.findIndex((item) => item.to === pathname);

    if (matchingIndex !== -1) {
      setSelectedMenu(matchingIndex);
    }
  }, [location]);

  // 사용자의 로그인 상태 변경을 관찰하고 변경되면 실행됩니다.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // 사용자 상태 업데이트
      setIsLoading(false);
    });

    return () => {
      unsubscribe(); // 컴포넌트가 언마운트될 때 관찰 해제
    };
  }, [auth]);

  const handleLogout = () => {
    auth.signOut();
  };

  return (
    <DesktopNavBox>
      <Menus>
        {menuItems.map((el, index) => (
          <MovePage
            key={index}
            to={el.to}
            className={selectedMenu === index ? "menu active" : "menu"}
            onClick={() => {
              handleMenuClick(index);
            }}
          >
            {el.label}
          </MovePage>
        ))}
      </Menus>
      <RightBox>
        {user ? (
          <Logout onClick={handleLogout}>로그아웃</Logout>
        ) : (
          <Login onClick={handleLogIn}>
            <Link to="/auth/signIn">로그인</Link>
          </Login>
        )}
        <IconBox>
          <FaRegWindowMaximize />
          <CgClose style={{ fontSize: "3rem" }} />
        </IconBox>
      </RightBox>
    </DesktopNavBox>
  );
};
export default DesktopNav;
