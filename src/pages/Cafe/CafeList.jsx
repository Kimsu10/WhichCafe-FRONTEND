import styled from 'styled-components';
import CafeDetail from './CafeDetail';
import { useEffect, useState } from 'react';
import { BsShare, BsHeart, BsFillStarFill, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getCookieToken } from '../../Storage/Cookie';

const CafeList = ({ cafeData }) => {
  const [isOpenArray, setIsOpenArray] = useState([]);
  const [isLike, setIsLike] = useState({});
  console.log(isLike);
  const navigate = useNavigate();

  const { token } = getCookieToken();

  const sortedCafeList = cafeData.sort((a, b) => {
    const cafeA = parseFloat(a.distance.replace('km', '').trim());
    const cafeB = parseFloat(b.distance.replace('km', '').trim());
    return cafeA - cafeB;
  });

  console.log(sortedCafeList);

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

  //좋아요 클릭시 백에 데이터 전송
  const handleLike = i => {
    alert('클릭');
    if (sortedCafeList && sortedCafeList[i]) {
      const cafeId = sortedCafeList[i].cafe_id;
      console.log(sortedCafeList[i].cafe_id);

      fetch(`${process.env.REACT_APP_API_URL}/favorites/${cafeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${token}`,
        },
      })
        .then(res => {
          console.log(res);
          if (res.status === 201) {
            setIsLike(prevLikes => {
              const newLikes = [...prevLikes];
              newLikes[i] = !newLikes[i];
              return newLikes;
            });
          } else if (res.status === 400) {
            console.log('keyerror');
          } else if (res.status === 401) {
            alert('로그인이 필요합니다.');
          }
        })
        .catch(error => {
          console.error('통신 에러:', error);
        });
    }
  };

  const handleDisLike = i => {
    let cafeId = cafeData[i].cafe_id;
    fetch(`${process.env.REACT_APP_API_URL}/likes/${cafeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // token: refreshToken,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === 'FAVORITES_DATA_NOT_EXIST') {
          alert('이미 즐겨찾기에서 삭제되었습니다.');
        } else if (data.message === 'DELETE_SUCCESS') {
          console.log('좋아요 삭제 성공');
          setIsLike(prevLikes => {
            const newLikes = [...prevLikes];
            newLikes[i] = !newLikes[i];
            return newLikes;
          });
        } else if (data.message === 'Token expired. Please refresh token') {
          alert('토큰 만료. 다시 로그인 해주세요');
          console.error('카페 삭제 실패:', data.message);
        } else {
          alert('삭제 실패: 개발자에게 문의하세요');
          console.error('카페 삭제 실패:', data.message);
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
