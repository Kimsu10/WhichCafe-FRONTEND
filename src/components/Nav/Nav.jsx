import { styled } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
// import UserSidebar from './UserSidebar';
import IntroduceSidebar from './IntroduceSidebar';
// import Login from '../../pages/User/Login';
import TestLogin from '../../pages/User/TestLogin';

const Nav = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = e => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        isLeftOpen
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
          <Icon src="/images/menu.png" alt="유저정보버튼" />
        </MenuBtn>

        <LeftSidebarWrapper isLeftOpen={isLeftOpen} ref={sidebarRef}>
          {isLeftOpen && <IntroduceSidebar setIsLeftOpen={setIsLeftOpen} />}
        </LeftSidebarWrapper>
        <LocationName>현재 위치의 지역명</LocationName>
        <LoginBtn onClick={() => setIsRightOpen(true)}>로그인</LoginBtn>
        {/* {isRightOpen && <UserSidebar setIsRightOpen={setIsRightOpen} />} */}
        <UserBox ref={sidebarRef}>
          {isRightOpen && <TestLogin setIsRightOpen={setIsRightOpen} />}
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

const LeftSidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${({ isLeftOpen }) => (isLeftOpen ? '0' : '-30%')};
  transition: left 0.5s ease;
`;

const MenuBtn = styled.button``;

const LocationName = styled.div``;

const LoginBtn = styled.button`
  color: ${props => props.theme.mainColor};
  font-size: 0.9em;
`;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;

const UserBox = styled.div`
  position: absolute;
  width: 768px;
  top: 60%;
  left: 0;
  z-index: 1999;
`;
