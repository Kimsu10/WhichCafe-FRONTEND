import { styled } from 'styled-components';
import KakaoMaps from '../../pages/KakaoMaps/kakaoMaps';

const Main = () => {
  return (
    <MainBody>
      <KakaoMaps />
    </MainBody>
  );
};

export default Main;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
