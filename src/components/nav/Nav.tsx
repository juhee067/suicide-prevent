import React from "react";
import styled from "styled-components";
import Icon from "../common/Icon";
import { HiMenuAlt1 } from "react-icons/hi";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.color.mainBlack};
`;
const MenuIcon = styled(Icon)`
  color: #fff;
  font-size: 3rem;
`;

const Nav = () => {
  return (
    <NavWrapper>
      <MenuIcon>
        <HiMenuAlt1 />
      </MenuIcon>
    </NavWrapper>
  );
};

export default Nav;
