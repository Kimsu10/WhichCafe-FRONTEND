import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const KakaoMap = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState(null);
  const [circle, setCircle] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [state, setState] = useState({
    center: {
      lat: '',
      lng: '',
    },
    isLoading: true,
    errMsg: null,
  });

  // 지도를 로딩할때 4초 걸리는 이유가 뭘까?
  //의심1 useEffect때문에 지도의 랜더링이 늦는거같다.(x)
  //의심2 setMap('')이여서 처음에 안뜨는거같다 -> 초기지도의 상태를 변수로 저장해서 설정하면될까?(x)
  //원인이 뭐냐구ㅜ
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
          level: 6,
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

        const radius = 2000;
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
  //현재위치 찾기
  const getCurrentPosBtn = () => {
    navigator.geolocation.getCurrentPosition(
      getPosSuccess,
      () => alert('위치 정보를 가져오는데 실패했습니다.'),
      {
        enableHighAccuracy: false,
        maximumAge: 30000,
        timeout: 3000,
      },
    );
  };

  //검색했을때 카카오맵이 그위치로 이동함.
  // 근데 백엔드에 그정보를 보내주어야한다. -> 검색버튼을 눌렀을때 fetch를 해서 백에 저장하는 데이터명으로 검색한 목록을 보내주면
  // 백에서 include같은함수를써서 그 값들을 응답해주는걸까?
  //그럼 handleSearch를 클릭했을때 그위치로 이동하게하면서 백으로 요청응답을 받도록 만들까?
  const handleSearch = () => {
    if (searchInput) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(searchInput, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          console.log(coords);

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
