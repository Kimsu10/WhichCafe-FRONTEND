import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserSidebar = ({ setIsLeftOpen }) => {
  const navigate = useNavigate();
  //임시token 다른 방식으로
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState();

  const handleSignInClick = () => {
    navigate('/login');
    setIsLeftOpen(false);
  };

  const handleLikeClick = () => {
    navigate('/like');
    setIsLeftOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    setToken(null);
  };

  const handleWithdrawUser = e => {
    e.preventDefault();
    if (window.confirm('정말로 탈퇴하시겠습니까?'))
      fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: token,
        },
      }).then(
        () => localStorage.clear(),
        alert('이용해주셔서 감사합니다.'),
        navigate('/'),
      );
  };

  useEffect(() => {
    fetch(`/data/userData.json`)
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);

  return (
    <BodyBox>
      <SlideBox>
        <CloseBtn onClick={() => setIsLeftOpen(false)}>✕</CloseBtn>
        <InitSlideBox>
          {!token && (
            <Link to="/login">
              <SignInBtn onClick={handleSignInClick}>로그인</SignInBtn>
            </Link>
          )}
        </InitSlideBox>
        <LoginedSlideBox>
          {token && (
            <UserBox>
              <UserName>안녕하세요 {userData?.data.nickname}님!</UserName>
              <Link to="/like">
                <LikeBtn onClick={handleLikeClick}>즐겨찾기</LikeBtn>
              </Link>
              <LogOutBtn onClick={handleLogout}>로그아웃</LogOutBtn>
            </UserBox>
          )}

          {token && (
            <WithdrawBox>
              <WithdrawBtn onClick={handleWithdrawUser}>회원탈퇴</WithdrawBtn>
            </WithdrawBox>
          )}
        </LoginedSlideBox>
      </SlideBox>
    </BodyBox>
  );
};

export default UserSidebar;

const BodyBox = styled.div``;

const SlideBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  border-radius: 0 0.7em 0.7em 0;
  z-index: 9999;
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: flex-end;
`;

const InitSlideBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const SignInBtn = styled.button``;

const LoginedSlideBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserName = styled.p`
  margin: 1.2em 0 3em 0;
  text-align: center;
  font-size: 1.6em;
  color: white;
`;

const UserBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const LikeBtn = styled.button``;

const LogOutBtn = styled.button``;

const WithdrawBox = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row-reverse;
  align-items: flex-end;
  padding: 2em;
`;

const WithdrawBtn = styled.button``;
