import { keyframes, styled } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import IntroduceSidebar from './IntroduceSidebar';
import Login from '../../pages/User/Login';

import { useDispatch, useSelector } from 'react-redux';
import { getCookieToken, removeCookieToken } from '../../Storage/Cookie';
import Like from '../../pages/Like/Like';

export const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(30%);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

const Nav = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [isLocationName, setIsLocationName] = useState('');

  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const { token } = useSelector(state => state.token);
  console.log(token);
  const { refreshToken } = getCookieToken();

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        (leftSideRef.current &&
          !leftSideRef.current.contains(e.target) &&
          isLeftOpen) ||
        (rightSideRef.current &&
          !rightSideRef.current.contains(e.target) &&
          isRightOpen)
      ) {
        setIsLeftOpen(false);
        setIsRightOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLeftOpen, isRightOpen]);

  return (
    <BodyBox>
      <NavBody>
        <MenuBtn onClick={() => setIsLeftOpen(true)}>
          <LogoName src="/images/name.png" alt="logo" />
        </MenuBtn>
        <LeftSidebarWrapper isLeftOpen={isLeftOpen} ref={leftSideRef}>
          {isLeftOpen && <IntroduceSidebar setIsLeftOpen={setIsLeftOpen} />}
        </LeftSidebarWrapper>
        {isLocationName && <LocationName>현재 위치의 지역명</LocationName>}

        {!refreshToken ? (
          <LoginBtn onClick={() => setIsRightOpen(true)}>로그인</LoginBtn>
        ) : (
          <Icon
            src="/images/menu.png"
            alt="유저정보버튼"
            onClick={() => setIsRightOpen(true)}
          />
        )}
        {!refreshToken && isRightOpen && (
          <UserBox isRightOpen={isRightOpen} ref={rightSideRef}>
            <Login setIsRightOpen={setIsRightOpen} />
          </UserBox>
        )}
        {refreshToken && isRightOpen && (
          <LoginedUserBox isRightOpen={isRightOpen} ref={rightSideRef}>
            <Like setIsRightOpen={setIsRightOpen} />
          </LoginedUserBox>
        )}
      </NavBody>
    </BodyBox>
  );
};

export default Nav;

const BodyBox = styled.div`
  display: flex;
  justify-content: center;
`;

const NavBody = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 768px;
  height: 3.5em;
  background-color: ${props => props.theme.subColor};
  color: ${props => props.theme.mainColor};
`;

const LogoName = styled.img`
  width: 100px;
  height: 30px;
`;

const LeftSidebarWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ isLeftOpen }) => (isLeftOpen ? '0' : '-30%')};
  transition: left 0.5s ease;
`;

const MenuBtn = styled.button``;

const LocationName = styled.div`
  padding-right: 4em;
`;

const LoginBtn = styled.button`
  color: ${props => props.theme.mainColor};
  padding-right: 1.5em;
  font-size: 0.9em;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 1em;
  cursor: pointer;
`;

const UserBox = styled.div`
  position: absolute;
  top: 60%;
  left: 23%;
  z-index: 9999;
`;

const LoginedUserBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  /* top: 0; */
  bottom: -95vh;
  right: 0;
  /* left: ${({ isRightOpen }) => (isRightOpen ? '0' : '30%')};
  transition: right 0.5s ease; */
  z-index: 9999;
  background-color: #f7f0e0;
  animation: ${fadeIn} 0.7s ease;
`;
