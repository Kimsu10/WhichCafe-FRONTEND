import { styled } from 'styled-components';
import CafeList from '../Cafe/CafeList';
import KakaoMaps from '../../hooks/KakaoMaps/kakaoMaps';

const Main = () => {
  return (
    <MainBody>
      <MapBox>
        <KakaoMaps />
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
