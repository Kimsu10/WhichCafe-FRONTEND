import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

const IntroduceSidebar = ({ setIsLeftOpen }) => {
  return (
    <BodyBox>
      <SlideBox>
        <CloseBtn onClick={() => setIsLeftOpen(false)}>✕</CloseBtn>
        <Link to="/">
          <ProjectName onClick={() => setIsLeftOpen(false)}>
            카페어디
          </ProjectName>
        </Link>
        <ProjectImage src="/images/main.png" alt="메인이미지" />
        <IntroduceText>
          서울,인천,경기지역의 24시로 운영하는 카페를 안내하는 서비스입니다.
        </IntroduceText>
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
  border-radius: 0 0.7em 0.7em 0;
  z-index: 9999;
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
