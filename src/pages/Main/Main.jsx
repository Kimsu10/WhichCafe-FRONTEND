import GoogleMaps from '../../hooks/GoogleMaps/GoogleMaps';
import { styled } from 'styled-components';
import CafeList from '../Cafe/CafeList';

const Main = () => {
  return (
    <MainBody>
      <MapBox>
        <GoogleMaps />
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
  width: 768px;
`;

const CafeListBox = styled.div`
  width: 768px;
`;
