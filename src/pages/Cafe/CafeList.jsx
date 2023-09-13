import styled from 'styled-components';
import CafeDetail from './CafeDetail';
import { useEffect, useState } from 'react';

const CafeList = () => {
  const [cafeList, setCafeList] = useState([]);
  const [isOpenArray, setIsOpenArray] = useState([]);

  useEffect(() => {
    const fetchCafeListData = async () => {
      try {
        const response = await fetch('/data/cafeListData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCafeList(data.data);

        setIsOpenArray(new Array(data.data.length).fill(false));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCafeListData();
  }, []);

  const toggleChange = id => {
    setIsOpenArray(prevArray => {
      const newArray = [...prevArray];
      newArray[id] = !newArray[id];
      return newArray;
    });
  };

  return (
    <CafeListBody>
      {cafeList?.map((el, index) => (
        <ColumnBody key={el.id}>
          <CafeInfoBody>
            <CafeMainImage src={el.image} alt="카페메인이미지" />
            <CafeInfoBox>
              <CafeName>가게 이름 : {el.name}</CafeName>
              <CafeAddress>가게 주소: {el.address}</CafeAddress>
              <CafeDistance>거리 {el.distance}m</CafeDistance>
              <CafeRating>★ {el.rating}(리뷰개수) </CafeRating>
            </CafeInfoBox>
            <SocialBox>
              <LikeBtn>❤️</LikeBtn>
              <ShareBtn>🔗</ShareBtn>
            </SocialBox>
          </CafeInfoBody>
          {isOpenArray[index] ? (
            <OpenToggle onClick={() => toggleChange(index)}>
              ▼ 상세정보
              <CafeDetail />
            </OpenToggle>
          ) : (
            <ClosedToggle onClick={() => toggleChange(index)}>
              ▶️ 상세정보
            </ClosedToggle>
          )}
        </ColumnBody>
      ))}
    </CafeListBody>
  );
};

export default CafeList;

const CafeListBody = styled.div`
  background-color: #f7f0e0c9;
  padding: 1em 2em;
`;

const ColumnBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const CafeInfoBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CafeMainImage = styled.img`
  width: 5em;
  height: 5em;
  background-color: green;
  border-radius: 0.5em;
  margin: 1em;
`;

const CafeInfoBox = styled.ul`
  padding: 1em;
`;

const CafeName = styled.li``;

const CafeAddress = styled.li``;

const CafeDistance = styled.li``;

const CafeRating = styled.li``;

const SocialBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const LikeBtn = styled.button``;

const ShareBtn = styled.button``;

const ClosedToggle = styled.div`
  margin: 0 1em;
  cursor: pointer;
`;

const OpenToggle = styled.div`
  padding: 0 1em;
  cursor: pointer;
`;
