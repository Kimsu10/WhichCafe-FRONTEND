import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [state, setState] = useState({
    center: {
      lat: '',
      lng: '',
    },
    isLoading: true,
    errMsg: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const currentPos = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          const container = document.getElementById('map');
          const options = {
            center: currentPos,
            level: 3,
          };

          setMap(new window.kakao.maps.Map(container, options));
          setMarker(new window.kakao.maps.Marker());

          setState(prev => ({
            ...prev,
            isLoading: false,
          }));
        },
        err => {
          setState(prev => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        },
      );
    }
  }, []);

  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
      },
    );
  };

  const getPosSuccess = pos => {
    let currentPos = new window.kakao.maps.LatLng(
      pos.coords.latitude,
      pos.coords.longitude,
    );

    map.panTo(currentPos);

    if (marker) {
      marker.setMap(null);
      marker.setPosition(currentPos);
      marker.setMap(map);
    }
  };

  return (
    <div>
      <MapContainer id="map" />
      <Button onClick={getCurrentPosBtn}>현재 위치</Button>
    </div>
  );
};

export default KakaoMap;

const MapContainer = styled.div`
  width: 768px;
  height: 400px;
`;

const Button = styled.div`
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  margin-top: 10px;
`;
