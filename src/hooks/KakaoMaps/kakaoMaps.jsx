import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
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

          const markerImage = new window.kakao.maps.MarkerImage(
            '/images/location.png',
            new window.kakao.maps.Size(43, 43),
          );

          const newMarker = new window.kakao.maps.Marker({
            position: currentPos,
            map: newMap,
            image: markerImage,
          });
          setMarker(newMarker);

          const radius = 500;
          const circleOptions = {
            center: currentPos,
            radius: radius,
            strokeWeight: 1,
            strokeColor: '#0069e1',
            strokeOpacity: 0.7,
            fillColor: '#0088ff',
            fillOpacity: 0.2,
          };

          const newCircle = new window.kakao.maps.Circle(circleOptions);
          newCircle.setMap(newMap);
          setCircle(newCircle);

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

  const getPosSuccess = pos => {
    const currentPos = new window.kakao.maps.LatLng(
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
  top: 80%;
  left: 90%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
`;

const Icon = styled.img`
  width: 80%;
  height: 80%;
`;
