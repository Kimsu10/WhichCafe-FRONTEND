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
    isLoading: false,
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
            level: 4,
          };

          const newMap = new window.kakao.maps.Map(container, options);

          newMap.relayout();
          setMap(newMap);

          const newMarker = new window.kakao.maps.Marker({
            position: currentPos,
            map: newMap,
          });
          setMarker(newMarker);

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
        timeout: 5000,
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
      <Button onClick={getCurrentPosBtn}>
        <Icon src="/images/myLocation.png" alt="내 위치" />
      </Button>
    </div>
  );
};

export default KakaoMap;

const MapContainer = styled.div`
  width: 768px;
  height: 450px;
  position: relative;
`;

const Button = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: white;
  color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: absolute;
  top: 32%;
  left: 85%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const Icon = styled.img`
  width: 80%;
  height: 80%;
`;
