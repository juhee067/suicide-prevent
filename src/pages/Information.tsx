import React from "react";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import { FlexColumnDiv, FlexRowDiv } from "../components/styled/FlexDiv";
import { Btn, Caption, H2, H3, Paragraph, Subtitle } from "../components/styled/styledSpanagraph";

const Wrapper = styled.div`
  padding: 100px;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
`;
const TitleBox = styled(H2)`
  padding: 15px;
  display: block;
  text-align: center;
  border-top: 2px solid ${({ theme }) => theme.color.mainGray};
  border-bottom: 2px solid ${({ theme }) => theme.color.mainGray};
  letter-spacing: 0.1em;
`;
const ContentBox = styled(FlexRowDiv)`
  padding: 50px 0;
  justify-content: space-between;
  /* background-color: #f00; */
`;
const Article = styled(FlexColumnDiv)`
  justify-content: space-between;
`;
const SubTitleBox = styled.div``;

const KeyRemark = styled(FlexColumnDiv)`
  margin-bottom: 30px;
  gap: 5px;
`;
const Desc = styled(FlexColumnDiv)`
  margin-bottom: 50px;
  gap: 5px;
`;
const Aside = styled(FlexRowDiv)`
  flex-wrap: wrap;
  justify-content: flex-end;
  height: 100px;
  gap: 20px;
  text-align: center;
`;
const CenterBtn = styled(Btn)`
  width: 40%;
  height: 40px;
  padding: 10px 20px;
  font-size: 1.2rem;
  background-color: #ff0;
`;

const DemandBox = styled.div`
  margin-top: 50px;
  color: ${({ theme }) => theme.color.mainGray};
`;

let center = [
  { id: 0, title: "자살예방상담전화", number: 1393 },
  { id: 1, title: "보건복지상담센터", number: 129 },
  { id: 2, title: "한국생명의전화", number: 15889191 },
  { id: 3, title: "정신건강상담전화", number: 15770199 },
];
const Information = () => {
  return (
    <Wrapper>
      <TitleBox>나는 살고 싶습니다</TitleBox>
      <ContentBox>
        <Article>
          <SubTitleBox>
            <KeyRemark>
              <H3>망설이지 말고 </H3>
              <H3>언제든지 연락해</H3>
            </KeyRemark>
            <Desc>
              <Paragraph>자살 위기를 넘기지 못했다면</Paragraph>
              <Paragraph>누리지 못할 두번째 삶</Paragraph>
            </Desc>
          </SubTitleBox>

          <Img src={`${process.env.PUBLIC_URL}/images/InfoMapAi.png`} width="40%" />
          <DemandBox>
            <Caption>지도를 클릭하면, 해당 지역의 센터 웹사이트로 이동합니다</Caption>
          </DemandBox>
        </Article>
        <Aside>
          {center.map((item) => {
            return <CenterBtn>{item.title}</CenterBtn>;
          })}
        </Aside>
      </ContentBox>
    </Wrapper>
  );
};

export default Information;
