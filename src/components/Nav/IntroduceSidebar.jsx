import { styled } from 'styled-components';

const IntroduceSidebar = ({ setIsLeftOpen }) => {
  return (
    <BodyBox>
      <SlideBox>
        <CloseBtn onClick={() => setIsLeftOpen(false)}>✕</CloseBtn>
        <ProjectName>카페어디</ProjectName>
        <ProjectImage src="/images/main.png" alt="메인이미지" />
        <IntroduceText> 어떤 서비스인지 소개</IntroduceText>
      </SlideBox>
    </BodyBox>
  );
};

export default IntroduceSidebar;

const BodyBox = styled.div``;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
  position: absolute;
  top: 0;
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
  color: ${props => props.theme.subColor};
`;
