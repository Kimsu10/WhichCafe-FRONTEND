import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ImStarFull } from 'react-icons/im';

import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import { DELETE_TOKEN } from '../../Store/AuthStore';

const Like = ({ setIsRightOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState();

  const { refreshToken } = getCookieToken();
  const { token } = useSelector(state => state.token);

  const handleMypageClick = () => {
    //임시 refreshToken
    if (refreshToken) {
      navigate('/mypage');
      setIsRightOpen(false);
    } else {
      alert('로그인이 필요합니다.');
      navigate('/');
    }
  };

  const handleLogout = () => {
    if (refreshToken) {
      dispatch(DELETE_TOKEN());
      removeCookieToken();
      window.location.reload();
    } else {
      alert('로그인이 필요합니다.');
    }
  };

  //유저 정보 조회
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API_URL}/users/mypage`, {
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json;charset=utf-8',
    //   authorization: refreshToken,
    // },
    fetch(`/data/userData.json`)
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);

  // 좋아요 리스트 조회
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API_URL}/users/favorites`, {
    // method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json;charset=utf-8',
    //   authorization: refreshToken,
    // },
    fetch(`/data/likeData.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setLikes(data.data));
  }, []);

  //좋아요 한 목록 지우기
  const handleUnLike = cafeId => {
    // fetch(`${process.env.REACT_APP_API_URL}/favorites/${cafeId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json;charset=utf-8',
    //     authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then(response => {
    //     if (response.status === 200) {
    //       const updatedLikes = likes.filter(info => info.cafe_id !== cafeId);
    //       setLikes(updatedLikes);
    //       console.log('카페 삭제 성공!');
    //     } else {
    //       console.error('카페 삭제 실패:', response.status);
    //     }
    //   })
    //   .catch(error => {
    //     console.error('카페 삭제 통신 오류:', error);
    //   });
    const updatedLikes = likes.filter(info => info.cafe_id !== cafeId);
    setLikes(updatedLikes);
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
              <ShareBtn src="images/share.png" alt="공유하기" />
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
