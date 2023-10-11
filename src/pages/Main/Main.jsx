import { styled } from 'styled-components';
import CafeList from '../Cafe/CafeList';
import KakaoMaps from '../../pages/KakaoMaps/kakaoMaps';
import Map from '../KakaoMaps/Map';

const Main = () => {
  return (
    <MainBody>
      <MapBox>
        <KakaoMaps />
        {/* <Map /> */}
      </MapBox>
      <CafeListBox>
        <CafeList />
      </CafeListBox>
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

const CafeListBox = styled.div`
  width: 768px;
`;
