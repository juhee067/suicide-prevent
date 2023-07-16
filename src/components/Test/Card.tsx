import React from "react";
import styled from "styled-components";
import { FlexColumnCenterDiv } from "../styled/FlexDiv";
import { Paragraph } from "../styled/styledSpanagraph";

const CardBox = styled(FlexColumnCenterDiv)``;

const DescBox = styled.div`
  padding: 50px;
  margin-bottom: 30px;
  width: 70%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.color.mainGray};
`;

const SelectBox = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;

  > * {
    flex: 1;
  }
`;

interface CardProps {
  description: string;
  btn: React.ReactNode[];
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
}

const Card = ({ description, btn, active, setActive }: CardProps) => {
  return (
    <CardBox>
      <DescBox>
        <Paragraph>{description}</Paragraph>
      </DescBox>
      <SelectBox>{btn}</SelectBox>
    </CardBox>
  );
};

export default Card;
