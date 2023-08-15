import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexRowCenterDiv, FlexRowDiv } from "../../module/styled/FlexDiv";
import { FaRegWindowMinimize, FaRegWindowMaximize } from "react-icons/fa";
import { CgClose } from "react-icons/cg";

const NavWrapper = styled(FlexRowCenterDiv)`
  padding: 0 20px;
  position: fixed;
  top: 0;
  justify-content: space-between;
  width: 100%;
  z-index: 999;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  border-right: none;
  background-color: ${({ theme }) => theme.color.mainWhite};
`;

const Menus = styled(FlexRowDiv)`
  font-size: 1.8em;
  font-weight: 700;
`;

const StyledLink = styled(Link)<isSelectedProps>`
  padding: 15px 20px;
  background-color: ${({ isSelected }) => (isSelected ? "#202020" : "transparent")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#202020")};
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
    ${({ theme }) => theme.color.mainWhite};
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

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/test", label: "Test" },
    { to: "/letter", label: "Letter" },
    { to: "/information", label: "Info" },
  ];

  return (
    <NavWrapper>
      <Menus>
        {menuItems.map((item, index) => (
          <StyledLink
            key={index}
            to={item.to}
            isSelected={selectedMenu === index}
            onClick={() => handleMenuClick(index)}
          >
            {item.label}
          </StyledLink>
        ))}
      </Menus>
      <IconBox>
        <FaRegWindowMinimize style={{ marginRight: "4px" }} />
        <FaRegWindowMaximize />
        <CgClose style={{ fontSize: "3rem" }} />
      </IconBox>
    </NavWrapper>
  );
};
export default Nav;
