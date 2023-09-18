import { styled } from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import UserSidebar from './UserSidebar';
import LocationSidebar from './LocationSidebar';

const Nav = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [name, setName] = useState('현재 위치 이름');
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
        <MenuBtn onClick={() => setIsLeftOpen(true)}>
          <Icon src="/images/menu.png" alt="유저정보버튼" />
        </MenuBtn>
        <LeftSidebarWrapper isLeftOpen={isLeftOpen} ref={sidebarRef}>
          {isLeftOpen && <UserSidebar setIsLeftOpen={setIsLeftOpen} />}
        </LeftSidebarWrapper>
        <LocationName onClick={() => setName('카페어디')}>{name}</LocationName>
        {/* <LocationName>현재 위치의 지역명</LocationName> */}
        <FindLocationBtn onClick={() => setIsRightOpen(true)}>
          <Icon src="/images/map.png" alt="위치찾기버튼" />
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
  background-color: ${props => props.theme.subColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 768px;
  height: 3.5em;
  position: relative;
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

const FindLocationBtn = styled.button``;

const Icon = styled.img`
  width: 100%;
  height: 100%;
`;
