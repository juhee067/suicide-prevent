import styled from "styled-components";

export const H1 = styled.span`
  font-size: 4rem;
  font-weight: 700;
`;

export const H2 = styled.span`
  font-size: 2.8rem;
  font-weight: 600;

  @media screen and (max-width: 1024px) {
    font-size: 1.75rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const H3 = styled.span`
  font-size: 2.4rem;
  font-weight: 500;
`;

export const Title = styled.span`
  font-size: 4.5rem;
  font-family: KyoboHandwriting2022khn;

  @media screen and (max-width: 1024px) {
    font-size: 4rem;
  }

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 320px) {
    font-size: 2.5rem;
  }
`;

export const Subtitle = styled.div`
  font-size: 2rem;
  font-weight: 500;
`;

export const Caption = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 1.2;
`;

export const LinkForm = styled.span`
  font-size: 1.6rem;
  font-weight: 300;
`;

export const Btn = styled.button`
  padding: 14px 50px;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: 0.02rem;
  border: none;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color.mainWhite};
  transition: background-color 0.3s ease-in-out;

  background-color: ${({ theme }) => theme.color.mainBlack};
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  @media screen and (max-width: 1024px) {
    padding: 15px 40px;
    font-size: 1.3rem;
  }

  @media screen and (max-width: 768px) {
    padding: 10px 25px;
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }

  @media screen and (max-width: 375px) {
    font-size: 0.5rem;
  }
`;

export const Paragraph = styled.p`
  font-size: 2rem;
  font-weight: 500;

  @media screen and (max-width: 1024px) {
    font-size: 1.75rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 1.4rem;
  }
  @media screen and (max-width: 320px) {
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
export const HighlightText = styled.span<{ $showunderline?: boolean }>`
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration: ${(props) => (props.$showunderline ? "underline" : "none")};
  cursor: pointer;
`;

export const MutedText = styled.p`
  font-size: 1.4rem;
  font-weight: 300;
  @media screen and (max-width: 768px) {
    font-size: 1.3rem;
  }
  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`;
