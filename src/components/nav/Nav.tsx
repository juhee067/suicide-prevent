import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FlexCenterDiv } from "../styled/FlexDiv";

const NavWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.color.mainGray};
`;

const Menus = styled(FlexCenterDiv)`
  padding: 30px 0;
  gap: 100px;
  font-size: 1.8em;
  font-weight: 500;
`;

const Nav = () => {
  return (
    <NavWrapper>
      <Menus>
        <Link to="/attachment">Intro</Link>
        <Link to="/main">Home</Link>
        <Link to="/test">Test</Link>
        <Link to="/information">Info</Link>
      </Menus>
    </NavWrapper>
  );
};

export default Nav;
