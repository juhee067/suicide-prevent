import styled from "styled-components";

interface IconProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

const Icon = styled.i<IconProps>`
  font-size: ${(props) => props.fontSize || "1.6rem"};
  color: ${(theme) => theme.color || "mainBlack"};
  font-weight: ${(props) => props.fontWeight || "300"};
`;

export default Icon;
