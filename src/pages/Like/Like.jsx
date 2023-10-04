import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import { DELETE_TOKEN } from '../../Store/AuthStore';

const Like = ({ setIsRightOpen }) => {
  const [likes, setLikes] = useState([]);
  const [userData, setUserData] = useState();
  const token = localStorage.getItem('token');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMypageClick = () => {
    navigate('/mypage');
    setIsRightOpen(false);
  };

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    }).then(async res => {
      if (res.status === 200) {
        dispatch(DELETE_TOKEN());
        removeCookieToken();
        return navigate('/');
      } else {
        window.location.reload();
      }
    });
  };

  const handleUnLike = id => {
    fetch(`${process.env.REACT_APP_API_URL}/likes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    });
  };

  useEffect(() => {
    fetch(`/data/userData.json`)
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);

  useEffect(() => {
    fetch(`/data/likeData.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setLikes(data.data));
  }, []);

  return (
    <Body>
      <UserName>안녕하세요 {userData?.data.nickname}님!</UserName>
      <MoveBox>
        <MypageBtn onClick={handleMypageClick}>마이페이지</MypageBtn>
        <LogOutBtn onClick={handleLogout}>로그아웃</LogOutBtn>
      </MoveBox>
      {likes.map(info => (
        <LikeBody key={info.id}>
          <CafeImage src={info.image} />
          <CafeName>{info.cafeName}</CafeName>
          <CafeLocation>{info.location}</CafeLocation>
          <BtnBox>
            <ShareBtn src="images/share.png" alt="공유하기" />
            <DeleteBtn onClick={() => handleUnLike(info.id)}>✕</DeleteBtn>
          </BtnBox>
        </LikeBody>
      ))}
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
  margin: 0 auto;
  width: 650px;
  height: 100vh;
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

const LikeBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 1em;
  width: 97%;
  border-bottom: 1px solid #e0d9cc;
`;

const CafeImage = styled.img`
  width: 65px;
  height: 65px;
`;

const CafeName = styled.h2`
  color: ${props => props.theme.mainColor};
`;

const CafeLocation = styled.p``;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
`;

const ShareBtn = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const DeleteBtn = styled.p`
  color: ${props => props.theme.mainColor};
  font-size: 22px;
  cursor: pointer;
`;

const GotoMain = styled.button`
  text-align: left;
  color: ${props => props.theme.mainColor};
  margin: 1.4em;
`;
