import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import CafeList from '../Cafe/CafeList';
import SearchCafeList from '../Cafe/SearchCafeList';
import Loading from './Loading';
import './CustomOverlay.scss';

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
  const [selectedCafe, setSelectedCafe] = useState(null);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    setIsModal(true);
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
          // setIsModal(false);
          const data = await response.json();
          setCafeData(data.nearbyAddress);
        } else {
          console.error('현재위치 정보 전송 실패');
          setIsModal(false);
        }

        //
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

        const cafeMarkerList = cafeData.map(cafe => {
          const latitude = parseFloat(cafe.cafe_latitude);
          const longitude = parseFloat(cafe.cafe_longitude);
          const cafePos = new window.kakao.maps.LatLng(latitude, longitude);

          const cafeMarker = new window.kakao.maps.Marker({
            position: cafePos,
            title: cafe.cafe_name,
            map: newMap,
          });
          // cafeMarker.setMap(map);

          const cafeContent = `
          <div class="CustomOverlay">
          <h4>${cafe.cafe_name}</h4>
          </div>`;

          const infowindow = new window.kakao.maps.InfoWindow({
            content: cafeContent,
            position: cafePos,
          });

          infowindow.open(newMap, cafeMarker);

          window.kakao.maps.event.addListener(cafeMarker, 'click', function () {
            infowindow.open(newMap, cafeMarker);
          });

          window.kakao.maps.event.addListener(newMap, 'click', function () {
            infowindow.close();
          });

          return cafeMarker;
        });

        const markerImage = new window.kakao.maps.MarkerImage(
          '/images/location.png',
          new window.kakao.maps.Size(43, 43),
        );

        const currentMarker = new window.kakao.maps.Marker({
          position: currentPos,
          map: newMap,
          image: markerImage,
        });
        setMarker([currentMarker, ...cafeMarkerList]);
        setIsModal(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsModal(false);
      }
    };
    fetchData();
  }, []);

  //현재위치로 버튼
  const getCurrentPosBtn = () => {
    setIsModal(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const currentPos = new window.kakao.maps.LatLng(
          pos.coords.latitude,
          pos.coords.longitude,
        );

        map.panTo(currentPos);

        setIsModal(false);
      },
      () => {
        alert('위치 정보를 가져오는데 실패했습니다.');
      },
      {
        enableHighAccuracy: false,
        maximumAge: 120000,
        timeout: 10000,
      },
    );
  };

  //검색했을때의 카카오맵.

  const handleSearch = async () => {
    if (searchCircle) {
      searchCircle.setMap(null);
    }

    if (searchInput) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const result = await new Promise((resolve, reject) => {
        geocoder.addressSearch(searchInput, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(result[0]);
          } else {
            reject(new Error('검색 결과가 없습니다.'));
          }
        });
      });

      const coords = new window.kakao.maps.LatLng(result.y, result.x);

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
        if (response.status === 200) {
          console.log('검색된 위치 정보 전송 성공');
          const data = await response.json();
          setSearchCafeData(data.cafeList);

          // 검색한 카페정보 지도에 표시하기
          for (const cafe of data.cafeList) {
            const cafeCoords = new window.kakao.maps.LatLng(
              parseFloat(cafe.cafe_latitude),
              parseFloat(cafe.cafe_longitude),
            );

            const searchCafeMarker = new window.kakao.maps.Marker({
              position: cafeCoords,
              map: map,
              title: cafe.cafe_name,
            });
            map.panTo(coords);
            //인포를띄우면 마커는 생성되나 인포는 뜨지않고 검색이 되지않는 문제가 발생한다.
            //내가 지금 같은 위와 같은 이름으로 데이터를 사용하고있어서 그런걸까?
            const cafeContent = `
            <div class="CustomOverlay">
            <img class="overlayImg" src='https://ac-p2.namu.la/20221211sac/419446317f2b5c6d73928b9840fc4f671f7a9c9197ffc383b297d4767ac0843e.png?expires=1698800400&key=y0BWXzyZPe-UASnRATGmaw'>
            <h4>${cafe.cafe_name}</h4>
            </div>`;

            const infowindow = new window.kakao.maps.InfoWindow({
              content: cafeContent,
              position: cafeCoords,
            });

            infowindow.open(searchCafeMarker);

            // window.kakao.maps.event.addListener(marker, 'click', function () {
            //   infowindow.open(map, marker);
            // });

            // window.kakao.maps.event.addListener(map, 'click', function () {
            //   infowindow.close();
            // });

            searchCafeMarker.setMap(map);
          }
        } else {
          console.error('검색된 위치 정보 전송 실패');
        }
      } catch (error) {
        console.error('통신 에러:', error);
      }
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
