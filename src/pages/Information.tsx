import React from "react";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import Map from "../components/Map";
import { FlexColumnDiv, FlexRowDiv } from "../components/styled/FlexDiv";
import { Btn, Caption, H2, H3, Paragraph } from "../components/styled/styledSpanagraph";

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
  padding: 40px 0;
`;

const Article = styled(FlexColumnDiv)`
  justify-content: space-between;
`;

const SubTitleBox = styled.div``;
const AiBox = styled.div``;

const KeyRemark = styled(FlexColumnDiv)`
  margin-bottom: 30px;
  gap: 5px;
`;

const Desc = styled(FlexColumnDiv)`
  margin-bottom: 50px;
  gap: 5px;
`;

const Aside = styled(FlexColumnDiv)`
  gap: 10px;
`;

const DemandBox = styled.div`
  margin-top: 50px;
  color: ${({ theme }) => theme.color.mainGray};
`;

const CenterBtnBox = styled(FlexRowDiv)`
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: space-between;
  width: 400px;
  gap: 10px;
  position: relative;
`;

const CenterBtn = styled(Btn)`
  width: 48.7%;
  padding: 10px 20px;
  font-size: 1.2rem;
`;

let center = [
  { id: 0, title: "자살예방상담전화", number: "1393" },
  { id: 1, title: "보건복지상담센터", number: "129" },
  { id: 2, title: "한국생명의전화", number: "15889191" },
  { id: 3, title: "정신건강상담전화", number: "15770199" },
  { id: 4, title: "청소년 전화", number: "1388" },
  { id: 5, title: "가족 및 지인", number: "1393" },
];

const Information = () => {
  const makePhoneCall = (phoneNumber: any) => {
    const telLink = `tel:${phoneNumber}`;
    window.location.href = telLink;
  };
  return (
    <Wrapper>
      <TitleBox>이또한 지나가리라.</TitleBox>
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
          <AiBox>
            <Img src={`${process.env.PUBLIC_URL}/images/InfoMapAi.png`} width="47%" />
          </AiBox>
          <DemandBox>
            <Caption>지도의 마커를 클릭하면, 해당 지역의 센터 웹사이트로 이동합니다</Caption>
          </DemandBox>
        </Article>
        <Aside>
          <Map />
          <CenterBtnBox>
            {center.map((item) => {
              return (
                <CenterBtn>
                  <a href={`tel : ${item.number}`} onClick={() => makePhoneCall(item.number)}>
                    {item.title}
                  </a>
                </CenterBtn>
              );
            })}
          </CenterBtnBox>
        </Aside>
      </ContentBox>
    </Wrapper>
  );
};

export default Information;
