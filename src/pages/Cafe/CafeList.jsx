import styled from 'styled-components';
import CafeDetail from './CafeDetail';
import { useEffect, useState } from 'react';
import { BsShare, BsHeart, BsFillStarFill, BsHeartFill } from 'react-icons/bs';
import { getCookieToken } from '../../Storage/Cookie';
import { useSelector } from 'react-redux';
import useRefreshToken from '../../hooks/useRefreshToken';

const CafeList = ({ cafeData }) => {
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [isLike, setIsLike] = useState([]);
  const [curLike, setCurLike] = useState({});

  const token = useSelector(store => store.token.token.accessToken);
  const { refreshToken } = getCookieToken();
  const loading = useRefreshToken();

  const expiredTime = useSelector(store => store.token.token.expireTime);
  const currentTime = new Date().getTime();
  const fetchTime = expiredTime - currentTime;

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

  useEffect(() => {
    if (!loading) {
      window.location.reload();
    }
  }, [loading]);

  useEffect(() => {
    if (refreshToken) {
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
            const updatedLikes = {};
            data.forEach(item => {
              updatedLikes[item.id] = true;
            });
            setCurLike(updatedLikes);
          }
        } catch (error) {
          console.error('Fetch error:', error.message);
        }
      };

      fetchData();
    }
  }, [token]);

  const handleLike = async (cafeId, i) => {
    if (!refreshToken) {
      alert('로그인이 필요합니다.');
    } else if (refreshToken) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/favorites/${cafeId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.status === 201) {
          setCurLike(prevCurLike => ({
            ...prevCurLike,
            [cafeId]: true,
          }));
        } else if (response.status === 400) {
          console.log('keyerror');
        } else if (response.status === 401) {
          alert('토큰만료.로그인이 필요합니다.');
        }
      } catch (error) {
        console.error('통신 에러:', error);
      }
    }
  };

  const handleDisLike = async cafeId => {
    await fetch(`${process.env.REACT_APP_API_URL}/users/favorites/${cafeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 204) {
          setCurLike(prevCurLike => ({
            ...prevCurLike,
            [cafeId]: false,
          }));
        } else if (res.status === 401) {
          alert('토큰만료.로그인이 필요합니다.');
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
                  <LikeBox>
                    {curLike[el.cafe_id] ? (
                      <SocialBox>
                        <FillLikeIcon
                          onClick={() => handleDisLike(el.cafe_id)}
                        />
                      </SocialBox>
                    ) : (
                      <SocialBox>
                        <LikeIcon
                          onClick={() => {
                            handleLike(el.cafe_id);
                          }}
                        />
                      </SocialBox>
                    )}
                  </LikeBox>
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
  font-family: 'nanum';
  width: 768px;
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

const LikeBox = styled.div``;

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
