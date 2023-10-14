import { styled } from 'styled-components';
import CafeList from '../Cafe/CafeList';
import KakaoMaps from '../../pages/KakaoMaps/kakaoMaps';

const Main = () => {
  return (
    <MainBody>
      <MapBox>
        <KakaoMaps />
      </MapBox>
    </MainBody>
  );
};

export default Main;

const MainBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MapBox = styled.div`
  position: relative;
`;
