import React from "react";
import styled from "styled-components";
import { Img } from "../components/common/Img";
import { FlexColumnDiv, FlexRowDiv } from "../module/styled/FlexDiv";
import { Btn, H3, MutedText, Paragraph, Title } from "../module/styled/styledFont";
import { FiAlertOctagon } from "react-icons/fi";
import { BsSuitHeartFill } from "react-icons/bs";
import Map from "../components/info/Map";

const InfoWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.color.infoBg};
  border-bottom: 2px solid ${({ theme }) => theme.color.mainBlack};
`;

const InformationContainer = styled.div`
  padding: 170px 100px;
  margin: 0 auto;
  width: 100%;
  max-width: 1000px;

  @media screen and (max-width: 768px) {
    width: 80%;
    padding: 130px 0 70px;
  }

  @media screen and (max-width: 480px) {
    width: 70%;
    padding: 100px 0 30px;
  }

  @media screen and (max-width: 375px) {
    width: 80%;
    padding: 70px 0 0;
  }

  @media screen and (max-width: 320px) {
    padding: 70px 0 20px;
  }
`;

const TitleBox = styled(FlexRowDiv)`
  width: 100%;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  background-color: ${({ theme }) => theme.color.mainWhite};
  font-size: 4rem;
  font-family: KyoboHandwriting2022khn;

  @media screen and (max-width: 560px) {
    padding: 10px;
  }
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

const ContentBox = styled(FlexRowDiv)`
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px;
  border: 2px solid ${({ theme }) => theme.color.mainBlack};
  border-top: none;
  background-color: ${({ theme }) => theme.color.mainWhite};

  @media screen and (max-width: 768px) {
    padding: 40px 20px;
    gap: 20px;
  }
`;

const TitleName = styled(FlexRowDiv)`
  gap: 20px;
  align-items: center;
  letter-spacing: 0.1em;

  @media screen and (max-width: 480px) {
    gap: 10px;
  }
`;

const Article = styled(FlexColumnDiv)`
  width: 35%;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
    text-align: center;
  }
`;

const SubTitleBox = styled.div`
  font-family: KyoboHandwriting2022khn;
`;

const AiBox = styled.div`
  margin: 50px 0;

  @media screen and (max-width: 768px) {
    width: 50%;
    margin: 25px auto;
  }
  @media screen and (max-width: 480px) {
    width: 80%;
  }
`;

const KeyRemark = styled(FlexColumnDiv)`
  margin-bottom: 30px;
  gap: 5px;
  @media screen and (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
  }
  > * {
    @media screen and (max-width: 768px) {
      font-size: 1.7rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

const Desc = styled(FlexColumnDiv)`
  gap: 5px;
  > * {
    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media screen and (max-width: 480px) {
      font-size: 1.2rem;
    }
  }
`;

const Aside = styled(FlexColumnDiv)`
  width: 60%;
  gap: 5px;
  @media screen and (max-width: 768px) {
    margin: 0 auto;
    width: 100%;
    text-align: center;
  }
`;

const DemandBox = styled.div`
  color: ${({ theme }) => theme.color.mainGray};
`;

const CaptionBox = styled.div`
  line-height: 1.3;
`;

const CenterBtnBox = styled(FlexRowDiv)`
  position: relative;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

const CenterBtn = styled(Btn)`
  width: 48.9%;
  padding: 10px;
  font-size: 1.2rem;
  background-color: ${({ theme }) => theme.color.info};
  @media screen and (max-width: 330px) {
    width: 31%;
    font-size: 1rem;
  }
`;

const centerData = [
  { id: 0, title: "자살예방상담전화", number: "1393" },
  { id: 1, title: "보건복지상담센터", number: "129" },
  { id: 2, title: "한국생명의전화", number: "15889191" },
  { id: 3, title: "정신건강상담전화", number: "15770199" },
  { id: 4, title: "청소년 전화", number: "1388" },
  { id: 5, title: "가족 및 지인", number: "1393" },
];

const Information = () => {
  const handlePhoneAction = (phoneNumber: string) => {
    const telLink = `tel:${phoneNumber}`;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      window.location.href = telLink; // 모바일에서는 전화걸기
    } else {
      const tempInput = document.createElement("input");
      tempInput.value = phoneNumber;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      alert("전화번호가 복사되었습니다."); // 피시에서는 전화번호 복사
    }
  };

  return (
    <InfoWrapper>
      {/* <Door side="left" width="300px" /> */}
      <InformationContainer>
        <TitleBox>
          <TitleName>
            <FiAlertOctagon />
            <Title> Hello! GateKeeper</Title>
          </TitleName>
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
              <Img src={`${process.env.PUBLIC_URL}/images/infoMapAi.png`} width="55%" />
            </AiBox>
            <DemandBox>
              <CaptionBox>
                <MutedText>지도의 마커를 클릭하면,</MutedText>
                <MutedText>해당 지역의 센터 웹사이트로 이동합니다</MutedText>
              </CaptionBox>
            </DemandBox>
          </Article>
          <Aside>
            <Map />
            <CenterBtnBox>
              {centerData.map((item) => {
                return (
                  <CenterBtn key={item.id} onClick={() => handlePhoneAction(item.number)}>
                    {item.title}
                  </CenterBtn>
                );
              })}
            </CenterBtnBox>
          </Aside>
        </ContentBox>
      </InformationContainer>
      {/* <Door side="right" width="300px" /> */}
    </InfoWrapper>
  );
};

export default Information;
