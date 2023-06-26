import styled, { ThemeConsumer } from "styled-components";

export const H1 = styled.span`
  font-size: 4rem;
  font-weight: 700;
`;

export const H2 = styled.span`
  font-size: 3.2rem;
  font-weight: 600;
`;

export const H3 = styled.span`
  font-size: 2.4rem;
  font-weight: 500;
`;

export const Subtitle = styled.span`
  font-size: 2rem;
  font-weight: 500;
`;

export const Caption = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
`;

export const Link = styled.span`
  font-size: 1.6rem;
  font-weight: 300;
`;

export const Btn = styled.span`
  padding: 20px 0;
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Paragraph = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
`;

export const ErrorText = styled.p`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme }) => theme.color.mainGray};
`;
export const HighlightText = styled.p<{ showUnderline?: boolean }>`
  font-size: 1.6rem;
  font-weight: 600;
  text-decoration: ${(props) => (props.showUnderline ? "underline" : "none")};
`;

export const MutedText = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
`;
