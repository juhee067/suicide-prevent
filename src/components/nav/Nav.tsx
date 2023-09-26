import React from "react";
import styled from "styled-components";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

const NavBox = styled.div``;

const Nav = () => {
  return (
    <NavBox>
      <DesktopNav />
      <MobileNav />
    </NavBox>
  );
};
export default Nav;
