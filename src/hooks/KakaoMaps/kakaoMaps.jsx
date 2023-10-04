import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [isCafe, setIsCafe] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [state, setState] = useState({
    center: {
      lat: '',
      lng: '',
    },
    isLoading: true,
    errMsg: null,
  });

  useEffect(() => {
    fetch('/data/nearby.json')
      .then(res => res.json())
      .then(data => setIsCafe(data.nearbyAddress));
  }, []);

  console.log(isCafe);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await new Promise((resolve, reject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => resolve(position),
              err => reject(err),
            );
          }
        });

        const currentPos = new window.kakao.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude,
        );
        const container = document.getElementById('map');
        const options = {
          center: currentPos,
          level: 5,
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

        const radius = 1000;
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
      } catch (err) {
        setState(prev => ({
          ...prev,
          errMsg: err.message,
          isLoading: false,
        }));
      }
    };

    fetchData();
  }, []);

  //현재위치 마커
  const getPos = pos => {
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
  //현재위치 찾기
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPos,
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 4000,
      },
    );
  };

  //검색했을때 카카오맵이 그위치로 이동함.
  const handleSearch = () => {
    if (searchInput) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(searchInput, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          console.log(coords);

          const circle = new window.kakao.maps.Circle({
            center: coords,
            radius: 1000,
            strokeWeight: 1,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            fillColor: '#FF0000',
            fillOpacity: 0.1,
          });

          circle.setMap(map);

          map.panTo(coords);
          if (marker) {
            marker.setMap(null);
            marker.setPosition(coords);
            marker.setMap(map);
          }
        } else {
          alert('검색 결과가 없습니다.');
        }
      });
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <MapContainer id="map" />
      <SearchBar
        type="text"
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="찾으시는 지역명을 입력해주세요"
      />
      <SearchIcon
        src="images/search.png"
        alt="검색아이콘"
        onClick={handleSearch}
      />
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

const SearchBar = styled.input`
  position: absolute;
  background-color: white;
  z-index: 1000;
  left: 10%;
  top: 3%;
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 5%;
  right: 12%;
  z-index: 1001;
  height: 20px;
  cursor: pointer;
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
