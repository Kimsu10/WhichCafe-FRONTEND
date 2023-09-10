import GoogleMaps from '../../hooks/GoogleMaps/GoogleMaps';
import { styled } from 'styled-components';

const Main = () => {
  return (
    <MainBody>
      <MapBox>
        <GoogleMaps />
      </MapBox>
    </MainBody>
  );
};

export default Main;

const MainBody = styled.div`
  display: flex;
  justify-content: center;
`;

const MapBox = styled.div`
  background-color: beige;
  width: 768px;
`;
