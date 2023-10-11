import React, { useEffect } from 'react';
import styled from 'styled-components';

const Map = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const container = document.getElementById('map');
          const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 6,
          };
          // 지도 생성
          const map = new window.kakao.maps.Map(container, options);
          const markerPosition = new window.kakao.maps.LatLng(lat, lng);
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          // 마커 표시
          marker.setMap(map);
        },
        function (error) {
          console.error(error);
        },
      );
    } else {
      console.error('Geolocation을 지원하지 않습니다.');
    }
  }, []);

  return (
    <div>
      <MapContainer id="map" />
    </div>
  );
};

export default Map;

const MapContainer = styled.div`
  width: 768px;
  height: 450px;
`;
