import styled from 'styled-components';
import CafeDetail from './CafeDetail';
import { useEffect, useState } from 'react';
import { BsShare, BsHeart, BsFillStarFill, BsHeartFill } from 'react-icons/bs';
import { getCookieToken } from '../../Storage/Cookie';
import { useDispatch, useSelector } from 'react-redux';

const CafeList = ({ cafeData }) => {
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [isLike, setIsLike] = useState([]);

  const [likes, setLikes] = useState([]);

  const dispatch = useDispatch();
  const refreshToken = getCookieToken();

  const token = useSelector(store => store.token.token.accessToken);
  console.log(token);

  const sortedCafeList = cafeData.sort((a, b) => {
    const cafeA = parseFloat(a.distance.replace('km', '').trim());
    const cafeB = parseFloat(b.distance.replace('km', '').trim());
    return cafeA - cafeB;
  });

  const copyShareContents = text => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  };

  const handleShareClick = (cafeName, cafeAddress) => {
    const textToCopy = `가게 이름: ${cafeName}\n가게 주소: ${cafeAddress}`;
    copyShareContents(textToCopy);
    alert('카페 정보가 복사되었습니다: ', textToCopy);
  };

  console.log(sortedCafeList);
  console.log(isLike);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/favorites`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          setLikes(data);
        } else {
          console.error('Failed to fetch data:', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };

    fetchData();
  }, [token]);

  console.log(likes);

  //좋아요 클릭시 백에 데이터 전송
  const handleLike = async (cafeId, i) => {
    console.log(cafeId.toString());
    console.log(token);
    await fetch(`${process.env.REACT_APP_API_URL}/users/favorites/${cafeId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        console.log(res);
        if (res.status === 201) {
          // setIsLike(prevLikes => {
          //   const newLikes = [...prevLikes];
          //   newLikes[i] = !newLikes[i];
          //   console.log(newLikes);
          //   return newLikes;
          // });
          alert('성공');
        } else if (res.status === 400) {
          console.log('keyerror');
        } else if (res.status === 401) {
          alert('로그인이 필요합니다.');
        }
      })
      .catch(error => {
        console.error('통신 에러:', error);
      });
  };

  //좋아요 해제
  const handleDisLike = async (cafeId, i) => {
    console.log(cafeId);
    await fetch(`${process.env.REACT_APP_API_URL}/likes/${cafeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 204) {
          alert('삭제성공');
          // setIsLike(prevLikes => {
          //   const newLikes = [...prevLikes];
          //   newLikes[i] = !newLikes[i];
          //   return newLikes;
          // });
        } else if (res.status === 401) {
          alert('토큰만료');
        } else if (res.status === 404) {
          alert('이미 삭제된 카페입니다');
        }
      })
      .catch(error => {
        console.error('통신 에러:', error);
      });
  };

  const toggleChange = id => {
    setIsOpenArray(prevArray => {
      const newArray = [...prevArray];
      newArray[id] = !newArray[id];
      return newArray;
    });
  };

  console.log(isLike);
  console.log(likes);
  return (
    <CafeListBody>
      <NearCafeBox> 24시 카페 목록 </NearCafeBox>
      <ScrollList>
        {sortedCafeList?.map((el, i) => {
          const isScore = el.score !== null;
          return (
            <ColumnBody key={el.cafe_id}>
              <DataBox>
                <CafeInfoBody>
                  <CafeMainImage src={el.cafe_thumbnail} alt="카페메인이미지" />
                  <CafeInfoBox>
                    <CafeName>가게 이름: {el.cafe_name}</CafeName>
                    <CafeAddress>가게 주소: {el.cafe_address}</CafeAddress>
                    <CafeDistance>거리 {el.distance}</CafeDistance>
                    {isScore ? (
                      <CafeRating>
                        <StarIcon /> {parseFloat(el.score).toFixed(1)}
                      </CafeRating>
                    ) : null}
                  </CafeInfoBox>
                </CafeInfoBody>
                <SocialBox>
                  {/* <ShareIcon
                    onClick={() =>
                      handleShareClick(el.cafe_name, el.cafe_address)
                    }
                  /> */}
                  {isLike[el.cafe_id] ? (
                    <FillLikeIcon onClick={() => handleDisLike(el.cafe_id)} />
                  ) : (
                    <LikeIcon onClick={() => handleLike(el.cafe_id)} />
                  )}
                </SocialBox>
              </DataBox>
              {isOpenArray[el.cafe_id] ? (
                <OpenToggle>
                  <p onClick={() => toggleChange(el.cafe_id)}>▼ 상세정보</p>
                  <CafeDetail cafePhotos={el.cafe_photos} />
                </OpenToggle>
              ) : (
                <ClosedToggle>
                  <p onClick={() => toggleChange(el.cafe_id)}> ▶️ 상세정보 </p>
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
  background-color: #f8f4e9ed;
`;

const NearCafeBox = styled.h1`
  text-align: center;
  padding: 0.7em 0 0.4em 0;
  border-bottom: 2px solid #e9e0d3;
  color: ${props => props.theme.mainColor};
  background-color: ${props => props.theme.subColor};
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
  max-height: 650px;
  overflow-y: auto;
`;
