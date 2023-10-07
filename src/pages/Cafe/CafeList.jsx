import styled from 'styled-components';
import CafeDetail from './CafeDetail';
import { useEffect, useState } from 'react';
import { BsShare, BsHeart, BsFillStarFill, BsHeartFill } from 'react-icons/bs';

const CafeList = () => {
  const [cafeList, setCafeList] = useState([]);
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [isLike, setIsLike] = useState([]);

  //직경 2km 이내의 카페 정보 받아오기
  useEffect(() => {
    const fetchCafeListData = async () => {
      try {
        const response = await fetch('/data/nearby.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCafeList(data.nearbyAddress);

        setIsOpenArray(new Array(data.nearbyAddress.length).fill(false));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCafeListData();
  }, []);

  //좋아요 클릭시 백에 데이터 전송
  const handleLikeClick = i => {
    const cafeId = cafeList[i].id;
    fetch(`${process.env.REACT_APP_API_URL}/favorites/${cafeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // token: refreshToken,
      },
      body: JSON.stringify({
        account: '',
        cafe_id: '',
      }),
    }).then(res => {
      if (res.message === 'ADD_FAVORITES_SUCCESS') {
        setIsLike(prevLikes => {
          const newLikes = [...prevLikes];
          newLikes[i] = !newLikes[i];
          return newLikes;
        });
      }
    }, []);
  };

  //좋아요 해제시 백에 데이터 전송
  const handleDisLike = cafe_id => {
    // fetch(`${process.env.REACT_APP_API_URL}/likes/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     token: refreshToken,
    //   },
    // });
  };

  // 공유하기 클릭시 카페 주소 복사(카페 사이트가 있으면 준다는데 데이터 들어오는거 봐야알듯)
  //const handleOnClikck =() => {}

  const toggleChange = id => {
    setIsOpenArray(prevArray => {
      const newArray = [...prevArray];
      newArray[id] = !newArray[id];
      return newArray;
    });
  };

  return (
    <CafeListBody>
      <NearCafeBox> 1Km 이내의 24시 카페</NearCafeBox>
      <ScrollList>
        {cafeList?.map((el, i) => {
          const sliceDistance = Math.round(el.distance * 100) / 100;
          return (
            <ColumnBody key={i}>
              <DataBox>
                <CafeInfoBody>
                  <CafeMainImage src={el.cafe_photo} alt="카페메인이미지" />
                  <CafeInfoBox>
                    <CafeName>가게 이름 : {el.cafe_name}</CafeName>
                    <CafeAddress>가게 주소: {el.cafe_address}</CafeAddress>
                    <CafeDistance>거리 {sliceDistance} km</CafeDistance>
                    <CafeRating>
                      <StarIcon /> {el.rating}(4)
                    </CafeRating>
                  </CafeInfoBox>
                </CafeInfoBody>
                <SocialBox>
                  <ShareIcon />
                  {isLike[i] ? (
                    <FillLikeIcon onClick={() => handleLikeClick(i)} />
                  ) : (
                    <LikeIcon onClick={() => handleLikeClick(i)} />
                  )}
                </SocialBox>
              </DataBox>
              {isOpenArray[i] ? (
                <OpenToggle onClick={() => toggleChange(i)}>
                  ▼ 상세정보
                  <CafeDetail />
                </OpenToggle>
              ) : (
                <ClosedToggle onClick={() => toggleChange(i)}>
                  ▶️ 상세정보
                </ClosedToggle>
              )}
            </ColumnBody>
          );
        })}
      </ScrollList>
    </CafeListBody>
  );
};

export default CafeList;

const CafeListBody = styled.div`
  background-color: #f7f0e0c9;
`;

const NearCafeBox = styled.h1`
  text-align: center;
  padding: 0.7em 0 0.4em 0;
  border-bottom: 2px solid #e9e0d3;
  color: ${props => props.theme.mainColor};
`;

const ColumnBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em 2em;
  border-bottom: 1px solid #e9e0d3;
`;

const DataBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CafeInfoBody = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const CafeMainImage = styled.img`
  width: 6em;
  height: 6em;
  border-radius: 0.5em;
  margin: 1em;
`;

const CafeInfoBox = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7em;
  padding: 1em 0 0 1.5em;
`;

const CafeName = styled.li``;

const CafeAddress = styled.li``;

const CafeDistance = styled.li``;

const CafeRating = styled.li`
  display: flex;
  gap: 5px;
`;

const SocialBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 1em;
  gap: 40px;
`;

const StarIcon = styled(BsFillStarFill)`
  color: #ffdb3a;
`;

const ShareIcon = styled(BsShare)`
  color: ${props => props.theme.mainColor};
  width: 1.3em;
  height: 1.3em;
  cursor: pointer;
`;

const LikeIcon = styled(BsHeart)`
  color: ${props => props.theme.mainColor};
  width: 1.5em;
  height: 1.6em;
  cursor: pointer;
`;

const FillLikeIcon = styled(BsHeartFill)`
  width: 1.5em;
  height: 1.6em;
  color: #eb3b3b;
`;

const ClosedToggle = styled.div`
  margin: 0 1em;
  cursor: pointer;
`;

const OpenToggle = styled.div`
  padding: 0 1em;
  cursor: pointer;
`;

const ScrollList = styled.div`
  max-height: 600px;
  overflow-y: auto;
`;
