import React from "react";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import Map from "../components/Map";
import { FlexColumnDiv, FlexRowCenterDiv, FlexRowDiv } from "../components/styled/FlexDiv";
import { Btn, Caption, H2, H3, Paragraph } from "../components/styled/styledSpanagraph";
import { FiAlertOctagon } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
const Wrapper = styled.div`
  width: 100%;
  margin-top:52px;
  background-color: #fff8d7;
`;
const InformationContainer = styled.div`
  padding: 100px;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;
  height: calc(100vh - 52px);
`;

const TitleBox = styled(FlexRowDiv)`
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  background-color: #fff;
`;

const ContentBox = styled(FlexRowDiv)`
  padding: 40px 20px;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  border-top: none;
  background-color: #fff;
`;
const LeftBox = styled.div`
  display: flex;

  gap: 20px;
  align-items: center;
  text-align: center;
  letter-spacing: 0.1em;
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
  background-color: #ffd677;
`;

const LeftDoor = styled.div`
  position: absolute;
  top: 52px;
  left: 0;
  width: 15%;
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-top: 0;
  z-index: 900;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
const LeftDoorHand = styled.div`
  position: absolute;
  top: 50%;
  right: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: #474747;
  border: 1px solid #000;
  border-radius: 10px;
`;

const RightDoor = styled.div`
  position: absolute;
  top: 52px;
  right: 0;
  width: 15%;
  height: calc(100vh - 52px);
  background-color: #fff;
  border: 2px solid #000;
  border-top: 0;
  z-index: 900;
  transition: width 1s ease;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
`;
const RightDoorHand = styled.div`
  position: absolute;
  top: 50%;
  left: 30px;
  transform: translateY(-50%);
  width: 20px;
  height: 50px;
  background-color: #474747;
  border-radius: 10px;
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
      {" "}
      <InformationContainer>
        <LeftDoor>
          <LeftDoorHand />
        </LeftDoor>
        <TitleBox style={{ fontFamily: "DungGeunMo", fontSize: "4rem" }}>
          <LeftBox>
            <FiAlertOctagon />
            <span> Hello! GateKeeper</span>
          </LeftBox>

          <BsSuitHeartFill style={{ fontSize: "3rem", color: "#ff4332" }} />
        </TitleBox>
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
              <Caption>
                <Paragraph>지도의 마커를 클릭하면,</Paragraph>{" "}
                <Paragraph>해당 지역의 센터 웹사이트로 이동합니다</Paragraph>
              </Caption>
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
        <RightDoor>
          <RightDoorHand />
        </RightDoor>
      </InformationContainer>
    </Wrapper>
  );
};

export default Information;
