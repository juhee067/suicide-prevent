import styled from "styled-components";

export const H1 = styled.span`
  font-size: 4rem;
  font-weight: 700;
`;

export const H2 = styled.span`
  font-size: 3.2rem;
  font-weight: 600;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 375px) {
    font-size: 1.7rem;
  }
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
  line-height: 1.2;
`;

export const Link = styled.span`
  font-size: 1.6rem;
  font-weight: 300;
`;

export const Btn = styled.button`
  padding: 20px 0;
  border: none;
  font-size: 1.6rem;
  font-weight: 500;
  cursor: pointer;
`;

export const Paragraph = styled.p`
  font-size: 1.6rem;
  font-weight: 400;
  @media screen and (max-width: 375px) {
    font-size: 1.2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.3rem;
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
  cursor: pointer;
`;

export const MutedText = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
`;
