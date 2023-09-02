import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FlexRowCenterDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { FaRegWindowMinimize, FaRegWindowMaximize } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserLoginAccessTokenSlice } from "../../store/reducer/userData/userData/userLoginAccessTokenSlice";
import { setUserLoginDataSlice } from "../../store/reducer/userData/userData/userLoginDataSlice";

const NavWrapper = styled(FlexRowCenterDiv)`
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

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  @media screen and (max-width: 375px) {
    padding: 0;
  }
`;

const Menus = styled(FlexRowDiv)`
  font-size: 1.8em;
  font-weight: 700;
`;

const MovePage = styled(Link)`
  padding: 15px 20px;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;

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

const IconBox = styled(FlexRowDiv)`
  gap: 15px;
  align-items: center;
  font-size: 2.3rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.div``;
const Logout = styled.div`
  cursor: pointer;
`;

const Nav = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>();
  const location = useLocation(); // 현재 URL 경로를 가져오기 위한 Hook
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: { userLoginAccessTokenSlice: any }) => state.userLoginAccessTokenSlice
  );
  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/test", label: "Test" },
    { to: "/letter", label: "Letter" },
    { to: "/information", label: "Info" },
  ];

  const handleLogIn = () => {
    setSelectedMenu(undefined);
  };

  const handleLogout = () => {
    dispatch(setUserLoginDataSlice({ uid: "", userEmail: "", authToken: "" }));
    dispatch(setUserLoginAccessTokenSlice(""));
    console.log("로그아웃이 완료 되었습니다.");
  };

  useEffect(() => {
    // 현재 URL 경로에 따라 selectedMenu 초기화
    const pathname = location.pathname;
    const matchingIndex = menuItems.findIndex((item) => item.to === pathname);

    if (matchingIndex !== -1) {
      setSelectedMenu(matchingIndex);
    }
  }, [location]);

  return (
    <NavWrapper>
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
      <IconBox>
        {accessToken ? (
          <Logout onClick={handleLogout}>Logout</Logout>
        ) : (
          <Login onClick={handleLogIn}>
            <Link to="/auth/signIn">Login</Link>
          </Login>
        )}
        <FaRegWindowMinimize style={{ marginRight: "4px" }} />
        <FaRegWindowMaximize />
        <CgClose style={{ fontSize: "3rem" }} />
      </IconBox>
    </NavWrapper>
  );
};
export default Nav;
