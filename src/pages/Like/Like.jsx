import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ImStarFull } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import { DELETE_TOKEN, SET_TOKEN } from '../../Store/AuthStore';
// import { CheckToken } from '../hooks/CheckToken';
// import jwt_decode from 'jwt-decode';

const Like = ({ setIsRightOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { isAuth } = CheckToken();

  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState();

  const token = useSelector(state => state.token);
  const { refreshToken } = getCookieToken();
  // const decodedAccount = jwt_decode(refreshToken);

  console.log(token);
  console.log(refreshToken);

  const handleMypageClick = () => {
    if (refreshToken) {
      navigate('/mypage');
      setIsRightOpen(false);
    } else {
      alert('로그인이 필요합니다.');
      navigate('/');
      setIsRightOpen(false);
    }
  };

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: refreshToken,
      },
    })
      .then(res => {
        console.log(res);
        if (res.status === 204) {
          dispatch(DELETE_TOKEN());
          removeCookieToken();
          window.location.reload();
        } else if (res.status === 400) {
          console.log('key Error');
        } else if (res.status === 500) {
          console.log('fail to find refreshToken');
          alert('로그아웃 실패: 개발자에게 문의해주세요.');
        }
      })
      .catch(error => {
        console.error('통신 에러:', error);
        alert('로그아웃 실패: 개발자에게 문의해주세요.');
      });
  };

  //유저 정보 조회
  // useEffect(() => {
  //   if (!token.accessToken) {
  //   } else {
  //     fetch(`${process.env.REACT_APP_API_URL}/users/mypage`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //         authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then(res => {
  //         if (res.status === 200) {
  //           console.log(res);
  //           res.json();
  //         }
  //       })
  //       .then(data => setUserData(data));
  //   }
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (token.accessToken === null) {
        console.log(token.accessToken);
        const { refreshToken } = getCookieToken();

        const refreshAccessToken = async () => {
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/users/refreshtoken`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  authorization: refreshToken,
                },
              },
            );

            if (response.status === 200) {
              const newToken = await response.json();
              console.log(newToken);
              dispatch(SET_TOKEN(newToken.accessToken));
              return newToken.accessToken;
            } else {
              console.error('Failed to refresh access token');
              return null;
            }
          } catch (error) {
            console.error('Error refreshing access token', error);
            return null;
          }
        };

        const newAccessToken = await refreshAccessToken();

        if (newAccessToken) {
          fetch(`${process.env.REACT_APP_API_URL}/users/mypage`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              authorization: `Bearer ${newAccessToken}`,
            },
          })
            .then(res => {
              if (res.status === 200) {
                return res.json();
              } else {
                console.error('Failed to fetch data with the new access token');
                throw new Error(
                  'Failed to fetch data with the new access token',
                );
              }
            })
            .then(data => setUserData(data))
            .catch(error =>
              console.error(
                'Error fetching data with the new access token',
                error,
              ),
            );
        }
      } else {
        //accessToken이 유효할때
        fetch(`${process.env.REACT_APP_API_URL}/users/mypage`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
            authorization: `Bearer ${token.accessToken}`,
          },
        })
          .then(res => {
            if (res.status === 200) {
              return res.json();
            } else {
              console.error(
                'Failed to fetch data with the existing access token',
              );
              throw new Error(
                'Failed to fetch data with the existing access token',
              );
            }
          })
          .then(data => setUserData(data))
          .catch(error =>
            console.error(
              'Error fetching data with the existing access token',
              error,
            ),
          );
      }
    };

    fetchData();
  }, [token.accessToken]);

  // 좋아요 리스트 조회
  useEffect(() => {
    // fetch(`/data/likeData.json`, {
    //   method: 'GET',
    // })
    fetch(`${process.env.REACT_APP_API_URL}/users/favorites`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // authorization: `Bearer ${token}`,
        authorization: refreshToken,
      },
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(data => {
        console.log(data);
        setLikes(data.data);
      });
  }, []);

  //좋아요 한 목록 지우기
  const handleUnLike = cafeId => {
    fetch(`${process.env.REACT_APP_API_URL}/favorites/${cafeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 204) {
          const updatedLikes = likes.filter(info => info.cafe_id !== cafeId);
          setLikes(updatedLikes);
          console.log('카페 삭제 성공!');
        } else if (res.status === 401) {
          alert('토큰만료. 다시 로그인 해주세요');
          console.error('카페 삭제 실패:', res.status);
        } else if (res.status === 404) {
          alert('이미 즐겨찾기에서 삭제되었습니다.');
        } else if (res.status === 500) {
          alert('삭제 실패: 개발자에게 문의하세요');
        }
      })
      .catch(error => {
        console.error('카페 삭제 통신 오류:', error);
      });
  };

  return (
    <Body>
      <UserName>안녕하세요 {userData?.nickname}님!</UserName>
      <MoveBox>
        <MypageBtn onClick={handleMypageClick}>마이페이지</MypageBtn>
        <LogOutBtn onClick={handleLogout}>로그아웃</LogOutBtn>
      </MoveBox>
      <UserLikeBody>
        {likes.map(info => (
          <LikeBody key={info.cafe_id}>
            <CafeImage src={info.url} />
            <CafeName>{info.name}</CafeName>
            <CafeLocation>{info.address}</CafeLocation>
            <BtnBox>
              <ScoreBox>
                <ImStarFull />
                {info.score}
              </ScoreBox>
              {/* <ShareBtn src="images/share.png" alt="공유하기" /> */}
              <DeleteBtn onClick={() => handleUnLike(info.cafe_id)}>
                ✕
              </DeleteBtn>
            </BtnBox>
          </LikeBody>
        ))}
      </UserLikeBody>
      <Link to="/">
        <GotoMain onClick={() => setIsRightOpen(false)}>메인으로</GotoMain>
      </Link>
    </Body>
  );
};

export default Like;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #f7f0e0c9;
  margin-top: 1em;
  margin: 0 auto;
  width: 768px;
  height: 95vh;
  border-top: 1px solid #efeae0;
  padding: 1em 0;
  border-radius: 0.8em 0 0 0.8em;
`;

const UserName = styled.p`
  margin: 3em 0 3em 0;
  text-align: center;
  font-size: 1.6em;
  color: ${props => props.theme.mainColor};
`;

const MoveBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const MypageBtn = styled.button`
  color: ${props => props.theme.mainColor};
`;

const LogOutBtn = styled.button`
  color: ${props => props.theme.mainColor};
`;

const UserLikeBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const LikeBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 1em;
  width: 100%;
  border-bottom: 1px solid #e0d9cc;
`;

const CafeImage = styled.img`
  width: 65px;
  height: 65px;
  border-radius: 0.5em;
`;

const CafeName = styled.p`
  color: ${props => props.theme.mainColor};
  font-size: 1.3em;
`;

const CafeLocation = styled.p``;

const ScoreBox = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 7em;
`;

const ShareBtn = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const DeleteBtn = styled.p`
  color: ${props => props.theme.mainColor};
  font-size: 21px;
  cursor: pointer;
`;

const GotoMain = styled.button`
  text-align: left;
  color: ${props => props.theme.mainColor};
  margin: 1.4em;
`;
