import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import CafeList from '../Cafe/CafeList';
import SearchCafeList from '../Cafe/SearchCafeList';
import Loading from './Loading';

const KakaoMap = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [isCafe, setIsCafe] = useState(null);
  const [cafeData, setCafeData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchCircle, setSearchCircle] = useState(null);
  const [searchCafeData, setSearchCafeData] = useState([]);
  const [isModal, setIsModal] = useState(false);

  console.log(cafeData);

  useEffect(() => {
    setIsModal(true);
    const fetchData = async () => {
      const position = await new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => resolve(position),
            err => reject(err),
          );
        }
      });

      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      //현재위치 근처의 카페정보 받아오기
      const response = await fetch(
        // `${process.env.REACT_APP_API_URL}/location?latitude=${latitude}&longitude=${longitude}`,
        // {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        // },
        '/data/nearby.json',
      );
      if (response.status === 200) {
        console.log('현재위치 정보 전송 성공');
        setIsModal(false);
        const data = await response.json();
        setCafeData(data.nearbyAddress);
      } else {
        console.error('현재위치 정보 전송 실패');
        setIsLoading(false);
      }

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

      const currentCircle = new window.kakao.maps.Circle(circleOptions);
      currentCircle.setMap(newMap);
      setCircle(currentCircle);
    };

    fetchData();
  }, []);

  const getCurrentPosBtn = () => {
    setIsModal(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
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
        setIsModal(false);
      },
      () => {
        alert('위치 정보를 가져오는데 실패했습니다.');
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1800,
        timeout: 10000,
      },
    );
  };

  //검색했을때의 카카오맵.
  const handleSearch = () => {
    if (searchCircle) {
      searchCircle.setMap(null);
    }
    if (searchInput) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(searchInput, async (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const latitude = coords.getLat();
          const longitude = coords.getLng();

          // 검색한위치정보를 백엔드 서버에 GET
          try {
            const response = await fetch(
              // `${process.env.REACT_APP_API_URL}/location?address=${searchInput}`,
              // {
              //   method: 'GET',
              //   headers: {
              //     'Content-Type': 'application/json',
              //   },
              // },
              `/data/searchCafeList.json`,
            );
            if (response.ok) {
              console.log('검색된 위치 정보 전송 성공');
              const data = await response.json();
              setSearchCafeData(data.cafeList);
            } else {
              console.error('검색된 위치 정보 전송 실패');
            }
          } catch (error) {
            console.error('통신 에러 :', error);
          }

          const newCircle = new window.kakao.maps.Circle({
            center: coords,
            radius: 1000,
            strokeWeight: 1,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            fillColor: '#FF0000',
            fillOpacity: 0.1,
          });

          setSearchCircle(newCircle);
          newCircle.setMap(map);

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
    <Body>
      <div>
        <MapContainer id="map" />
        {isModal && <Loading />}
        <SearchBar
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          onKeyPress={handleKeyPress}
          onClick={() => handleSearch}
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
      {searchCafeData.length > 0 ? (
        <SearchCafeList searchCafeData={searchCafeData} />
      ) : (
        <CafeList cafeData={cafeData} />
      )}
    </Body>
  );
};

export default KakaoMap;

const Body = styled.div``;

const MapContainer = styled.div`
  width: 768px;
  height: 450px;
`;

const SearchBar = styled.input`
  position: absolute;
  background-color: white;
  z-index: 1000;
  left: 10%;
  top: 1.5%;
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 2.3%;
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
  top: 32%;
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
