import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import { DELETE_TOKEN } from '../../Store/AuthStore';

const UserSidebar = ({ setIsLeftOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken } = useSelector(state => state.token);
  const { refreshToken } = getCookieToken();
  const [userData, setUserData] = useState();

  const handleSignInClick = () => {
    navigate('/login');
    setIsLeftOpen(false);
  };

  const handleLikeClick = () => {
    navigate('/like');
    setIsLeftOpen(false);
  };

  //로그아웃시 브라우저에서만 지워야하나? 백엔드에도 토큰삭제요청을 해야하나?
  const handleLogout = async accessToken => {
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

  const handleWithdrawUser = e => {
    e.preventDefault();
    if (window.confirm('정말로 탈퇴하시겠습니까?'))
      fetch(`${process.env.REACT_APP_API_URL}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: refreshToken, // 잠깐..
        },
      }).then(async res => {
        if (res.status === 200) {
          dispatch(DELETE_TOKEN());
          removeCookieToken();
          alert('이용해주셔서 감사합니다.');
          navigate('/');
        }
      });
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
          {!refreshToken && (
            <Link to="/login">
              <SignInBtn onClick={handleSignInClick}>로그인</SignInBtn>
            </Link>
          )}
        </InitSlideBox>
        <LoginedSlideBox>
          {refreshToken && (
            <UserBox>
              <UserName>안녕하세요 {userData?.data.nickname}님!</UserName>
              <Link to="/like">
                <LikeBtn onClick={handleLikeClick}>즐겨찾기</LikeBtn>
              </Link>
              <LogOutBtn onClick={handleLogout}>로그아웃</LogOutBtn>
            </UserBox>
          )}

          {refreshToken && (
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
