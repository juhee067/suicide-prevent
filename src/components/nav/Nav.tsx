import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexRowDiv } from "../styled/FlexDiv";
import { FaRegWindowMinimize, FaRegWindowMaximize } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const NavWrapper = styled(FlexRowDiv)`
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  background-color: #fff;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const Menus = styled(FlexRowDiv)`
  font-size: 1.8em;
  font-weight: 700;

  /* &:active {
      background-color: #000;
      color: #fff; } */
`;
const StyledLink = styled(Link)<isSelectedProps>`
  padding: 15px 20px;
  background-color: ${({ isSelected }) => (isSelected ? "#202020" : "transparent")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#202020")};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #000000;
    color: #fff;
  }
`;

const IconBox = styled(FlexRowDiv)`
  gap: 15px;
  align-items: center;
  font-size: 2.3rem;
`;
interface isSelectedProps {
  isSelected: boolean;
}
const Nav = () => {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);

  const handleMenuClick = (index: number) => {
    setSelectedMenu(index);
  };
  return (
    <NavWrapper>
      <Menus>
        <StyledLink to="/main" isSelected={selectedMenu === 0} onClick={() => handleMenuClick(0)}>
          Home
        </StyledLink>
        <StyledLink to="/test" isSelected={selectedMenu === 1} onClick={() => handleMenuClick(1)}>
          Test
        </StyledLink>
        <StyledLink to="/letter" isSelected={selectedMenu === 2} onClick={() => handleMenuClick(2)}>
          Letter
        </StyledLink>
        <StyledLink to="/information" isSelected={selectedMenu === 3} onClick={() => handleMenuClick(3)}>
          Info
        </StyledLink>
      </Menus>
      <IconBox>
        <FaRegWindowMinimize />
        <FaRegWindowMaximize />
        <CgClose style={{ fontSize: "3rem" }} />
      </IconBox>
    </NavWrapper>
  );
};

export default Nav;
