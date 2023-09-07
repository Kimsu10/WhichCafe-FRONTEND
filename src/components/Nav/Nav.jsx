import { styled, keyframes } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import UserSidebar from './UserSidebar';
import LocationSidebar from './LocationSidebar';

const Nav = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        isLeftOpen
      ) {
        setIsLeftOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLeftOpen]);

  return (
    <BodyBox>
      <NavBody>
        <MenuBtn onClick={() => setIsLeftOpen(true)}>메뉴바</MenuBtn>
        <LeftSidebarWrapper isLeftOpen={isLeftOpen} ref={sidebarRef}>
          {isLeftOpen && <UserSidebar setIsLeftOpen={setIsLeftOpen} />}
        </LeftSidebarWrapper>
        <LocationName>현재 위치의 지역명</LocationName>
        <FindLocationBtn onClick={() => setIsRightOpen(true)}>
          위치찾기
        </FindLocationBtn>
        {isRightOpen && <LocationSidebar setIsRightOpen={setIsRightOpen} />}
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
  background-color: #d5d5d5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 768px;
  height: 3.5em;
  position: relative;
`;

const LeftSidebarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: ${({ isLeftOpen }) => (isLeftOpen ? '0' : '-30%')};
  transition: left 0.5s ease;
`;

const MenuBtn = styled.button``;

const LocationName = styled.div``;

const FindLocationBtn = styled.button``;
