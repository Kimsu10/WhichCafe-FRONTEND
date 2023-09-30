import { styled } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import IntroduceSidebar from './IntroduceSidebar';
import Login from '../../pages/User/Login';

const Nav = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

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
        <LocationName>현재 위치의 지역명</LocationName>
        <LoginBtn onClick={() => setIsRightOpen(true)}>로그인</LoginBtn>
        {/* <Icon src="/images/menu.png" alt="유저정보버튼" /> */}
        <UserBox isRightOpen={isRightOpen} ref={rightSideRef}>
          {isRightOpen && <Login setIsRightOpen={setIsRightOpen} />}
        </UserBox>
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
  background-color: ${props => props.theme.subColor};
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 768px;
  height: 3.5em;
  color: ${props => props.theme.mainColor};
`;

const LogoName = styled.img`
  width: 100px;
  height: 30px;
`;

const LeftSidebarWrapper = styled.div`
  position: absolute;
  top: 0;
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

// const Icon = styled.img`
//   width: 100%;
//   height: 100%;
// `;

const UserBox = styled.div`
  position: absolute;
  top: 60%;
  left: 23%;
  z-index: 1999;
`;
