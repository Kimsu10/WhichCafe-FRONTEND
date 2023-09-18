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
          console.log(currentPos);
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
        <Icon
          onClick={getCurrentPosBtn}
          src="/images/target.png"
          alt="Target Icon"
        />
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
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  padding: 5px;
  top: 33%;
  left: 79%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.img`
  width: 80%;
  height: 80%;
`;
