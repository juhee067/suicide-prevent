import React, { useState } from 'react';

import styled from 'styled-components';
import { HiMenu } from 'react-icons/hi';
import { CgClose } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { FlexColumnDiv } from '../../module/styled/FlexDiv';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const MobileNavBox = styled.div`
  position: relative;
`;

const ShadowBox = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  background-color: ${({ theme }) => theme.color.mainBlack};
  opacity: 0.6;
`;

const NavWrapper = styled.div<{ $isOpen: boolean }>`
  /* 스타일과 위치 설정은 필요에 따라 조절하세요. */
  width: 80%;
  height: 100%;
  padding: 20px;
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? '0' : '-80%')};
  background-color: ${({ theme }) => theme.color.mainWhite};
  transition: left 0.3s ease-in-out;
  z-index: 1000;
`;

const Content = styled(FlexColumnDiv)`
  align-items: center;
`;

const MenuButton = styled.button`
  display: none;
  position: fixed;
  top: 20px;
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  z-index: 999;
  @media screen and (max-width: 768px) {
    display: block;
    margin-left: 20px;
  }
`;

const CloseButton = styled.button`
  margin-bottom: 20px;
  background: none;
  border: none;
  font-size: 2.3rem;
  cursor: pointer;
`;

const Auth = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const Login = styled.div`
  font-size: 2rem;
`;

const Logout = styled.div`
  font-size: 2rem;
  cursor: pointer;
`;
// 나머지 코드는 이전 코드와 동일합니다.
const Menus = styled(FlexColumnDiv)`
  width: 100%;
  font-size: 2rem;
  text-align: center;
`;

const MovePage = styled(Link)`
  padding: 20px 25px;
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
`;

const MobileNav = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>();
  const [isOpen, setIsOpen] = useState(false); // 사이드바 열림/닫힘 상태
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  const menuItems = [
    { to: '/', label: '홈' },
    { to: '/test', label: '진단' },
    { to: '/letter', label: '편지' },
    { to: '/post', label: '게시판' },
    { to: '/Chatting', label: '채팅' },
    { to: '/information', label: '정보' },
  ];

  const handleLogIn = () => {
    setSelectedMenu(undefined);
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    // await persistor.purge(); // persistStore의 데이터 전부 날림
    setIsOpen(!isOpen);
  };

  // 이전 코드와 나머지 부분은 동일하게 유지됩니다.
  const handleOpenClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
    setIsOpen(!isOpen);
  };

  return (
    <MobileNavBox>
      <MenuButton onClick={handleOpenClick}>
        <HiMenu />
      </MenuButton>
      <NavWrapper $isOpen={isOpen}>
        <Content>
          <CloseButton onClick={handleOpenClick}>
            <CgClose />
          </CloseButton>
          <Auth>
            {isUserLoggedIn ? (
              <Logout onClick={handleLogout}>로그아웃</Logout>
            ) : (
              <Login onClick={handleLogIn}>
                <Link to='/auth/signIn'>로그인</Link>
              </Login>
            )}
          </Auth>
          <Menus>
            {menuItems.map((el, index) => (
              <MovePage
                key={index}
                to={el.to}
                className={selectedMenu === index ? 'menu active' : 'menu'}
                onClick={() => {
                  handleMenuClick(index);
                }}
              >
                {el.label}
              </MovePage>
            ))}
          </Menus>
        </Content>
      </NavWrapper>

      <ShadowBox $isOpen={isOpen} onClick={handleOpenClick} />
    </MobileNavBox>
  );
};

export default MobileNav;
