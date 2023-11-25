import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ImStarFull } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import {
  DELETE_TOKEN,
  SET_TOKEN,
  account,
  // handleTokenExpiration,
} from '../../Store/AuthStore';
import { handleTokenExpired } from '../../hooks/handleTokenExpired';
import useRefreshToken from '../../hooks/useRefreshToken';

const Like = ({ setIsRightOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState();

  const { refreshToken } = getCookieToken();
  const token = useSelector(store => store.token.token.accessToken);
  const loading = useRefreshToken();

  const handleMypageClick = () => {
    if (token) {
      navigate('/mypage');
      setIsRightOpen(false);
    } else {
      alert('로그인이 필요합니다.');
      navigate('/');
      setIsRightOpen(false);
    }
  };

  useEffect(() => {
    if (loading) {
      const fetchData = async () => {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_API_URL}/users/mypage`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json;charset=utf-8',
                authorization: `Bearer ${token}`,
              },
            },
          );

          if (res.status === 200) {
            const data = await res.json();
            setUserData(data);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData();
    }
  }, [token, loading]);

  const handleLogout = () => {
    const account = userData.account;
    fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: account,
      }),
    })
      .then(res => {
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

  const handleUnLike = cafeId => {
    console.log(cafeId);
    fetch(`${process.env.REACT_APP_API_URL}/users/favorites/${cafeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 204) {
          const updatedLikes = likes.filter(info => info.id !== cafeId);
          setLikes(updatedLikes);
          console.log('delete success!');
        } else if (res.status === 401) {
          alert('토큰만료. 다시 로그인 해주세요');
          console.error('fail to delete cafeId:', res.status);
        } else if (res.status === 404) {
          alert('already deleted.');
        } else if (res.status === 500) {
          alert('삭제 실패: 개발자에게 문의하세요');
        }
      })
      .catch(error => {
        console.error('fetch error:', error);
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
          <LikeBody key={info.id}>
            <CafeImage src={info.thumbnail} />
            <CafeName>{info.name}</CafeName>
            <CafeLocation>{info.address}</CafeLocation>
            <BtnBox>
              <ScoreBox>
                <ImStarFull />
                {info.score}
              </ScoreBox>
              {/* <ShareBtn src="images/share.png" alt="공유하기" /> */}
              <DeleteBtn onClick={() => handleUnLike(info.id)}>✕</DeleteBtn>
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
