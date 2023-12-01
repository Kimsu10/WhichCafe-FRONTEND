import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const IntroduceSidebar = ({ setIsLeftOpen }) => {
  const AskEmail = () => {
    const email = `${process.env.REACT_APP_EMAIL_ADDRESS}`;
    const title = '문의하기';
    const body = '이메일 테스트용 메세지';
    window.location.href = `mailto:${email}?title=${title}&body=${body}`;
  };

  return (
    <BodyBox>
      <SlideBox>
        <CloseBtn onClick={() => setIsLeftOpen(false)}>✕</CloseBtn>
        <Link to="/">
          {/* <ProjectName onClick={() => setIsLeftOpen(false)}>
            카페어디
          </ProjectName> */}
          <LogoBox>
            <NameImage
              src="/images/navLogo.png"
              onClick={() => setIsLeftOpen(false)}
            />
          </LogoBox>
        </Link>
        <ProjectImage src="/images/main.png" alt="메인이미지" />
        <IntroduceText>
          서울,인천,경기,부산의 24시로 운영하는 카페를 안내하는 서비스입니다.
        </IntroduceText>
        <AskBox onClick={AskEmail}>개발자에게 문의하기</AskBox>
      </SlideBox>
    </BodyBox>
  );
};

export default IntroduceSidebar;

const BodyBox = styled.div``;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
  position: absolute;
  margin-top: 10%;
  left: 0;
  padding: 1em;
  z-index: 9999;
  /* font-family: NanumGothic; */
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: flex-end;
  &:hover {
    text-decoration: none;
  }
`;

const ProjectName = styled.h1`
  color: ${props => props.theme.subColor};
  text-align: center;
  padding: 1.5em 0;
`;

const LogoBox = styled.div`
  display: flex;
  justify-content: center;
`;

const NameImage = styled.img`
  width: 18em;
  height: 5em;
  margin-top: 1em;
  margin-bottom: 4em;
`;

const ProjectImage = styled.img`
  justify-content: center;
  width: 70%;
  height: 40%;
  margin: 0 auto;
`;

const IntroduceText = styled.p`
  text-align: center;
  padding: 2em 0;
  font-size: 1.2em;
  color: ${props => props.theme.subColor};
`;

const AskBox = styled.div`
  font-size: 1.3em;
  color: white;
  text-align: center;
  margin-top: 7em;
  &:hover {
    cursor: pointer;
  }
`;
