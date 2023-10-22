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
  const [cafeData, setCafeData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchCafeData, setSearchCafeData] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [searchCafeMarkers, setsearchCafeMarkers] = useState([]);

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

          const markerImage = new window.kakao.maps.MarkerImage(
            '/images/location.png',
            new window.kakao.maps.Size(43, 43),
          );

          const currentMarker = new window.kakao.maps.Marker({
            position: currentPos,
            map: newMap,
            image: markerImage,
          });

          currentMarker.setMap(newMap);
        } else {
          console.error('현재위치 정보 전송 실패');
          setIsModal(false);
        }
        setIsModal(false);
      } catch (error) {
        console.error('통신에러:', error);
        setIsModal(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (map && cafeData.length > 0) {
      cafeData.map(cafe => {
        const latitude = parseFloat(cafe.cafe_latitude);
        const longitude = parseFloat(cafe.cafe_longitude);
        const cafePos = new window.kakao.maps.LatLng(latitude, longitude);
        const cafeMarker = new window.kakao.maps.Marker({
          position: cafePos,
          title: cafe.cafe_name,
          map: map,
        });

        const cafeContent = `
          <div class="CustomOverlay">
            <h4>${cafe.cafe_name}</h4>
          </div>`;

        const infowindow = new window.kakao.maps.InfoWindow({
          content: cafeContent,
          position: cafePos,
        });

        infowindow.open(map, cafeMarker);

        window.kakao.maps.event.addListener(cafeMarker, 'click', function () {
          infowindow.open(map, cafeMarker);
        });

        window.kakao.maps.event.addListener(map, 'click', function () {
          infowindow.close();
        });

        return cafeMarker;
      });
    }
  }, [map, cafeData]);

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

  const handleSearch = async () => {
    if (searchInput && map) {
      const geocoder = new window.kakao.maps.services.Geocoder();
      const result = await new Promise((resolve, reject) => {
        geocoder.addressSearch(searchInput, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            resolve(result[0]);
          } else {
            resolve(null);
          }
        });
      });

      if (result) {
        const coords = new window.kakao.maps.LatLng(result.y, result.x);

        try {
          const response = await fetch(
            // `${process.env.REACT_APP_API_URL}/location?address=${searchInput}`,
            //           // {
            //           //   method: 'GET',
            //           //   headers: {
            //           //     'Content-Type': 'application/json',
            //           //   },
            //           // },
            `/data/searchCafeList.json`,
          );
          if (response.status === 200) {
            const data = await response.json();
            setSearchCafeData(data.cafeList);

            searchCafeMarkers.forEach(markerInfo => {
              markerInfo.infowindow.close();
              markerInfo.marker.setMap(null);
            });

            const markers = await Promise.all(
              data.cafeList.map(async cafe => {
                const searchCoords = new window.kakao.maps.LatLng(
                  parseFloat(cafe.cafe_latitude),
                  parseFloat(cafe.cafe_longitude),
                );

                const searchMarker = new window.kakao.maps.Marker({
                  position: searchCoords,
                  map: map,
                  title: cafe.cafe_name,
                });

                const cafeContent = `
                  <div class="CustomOverlay">
                    <h4>${cafe.cafe_name}</h4>
                  </div>`;

                const infowindow = new window.kakao.maps.InfoWindow({
                  content: cafeContent,
                  position: searchCoords,
                });

                window.kakao.maps.event.addListener(
                  searchMarker,
                  'click',
                  function () {
                    infowindow.open(map, searchMarker);
                  },
                );

                window.kakao.maps.event.addListener(map, 'click', function () {
                  infowindow.close();
                });

                infowindow.open(map, searchMarker);

                return {
                  marker: searchMarker,
                  infowindow: infowindow,
                };
              }),
            );

            markers.forEach(markerInfo => {
              markerInfo.marker.setMap(map);
            });

            setsearchCafeMarkers(markers);

            await map.panTo(coords);
          } else {
            console.error('검색된 위치 정보 전송 실패');
          }
        } catch (error) {
          console.error('통신 에러:', error);
        }
      } else {
        setsearchCafeMarkers([]);
        alert('검색 결과가 없습니다.');
      }
    } else {
      alert('찾고자 하는 지역 또는 도로명을 입력해주세요');
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
