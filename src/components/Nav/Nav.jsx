import styled from 'styled-components';
import { useRef, useState } from 'react';
import UserSidebar from './UserSidebar';
import LocationSidebar from './LocationSidebar';

const Nav = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const outSection = useRef();

  return (
    <BodyBox
      ref={outSection}
      onClick={e => {
        if (outSection.current === e.target) {
          setIsLeftOpen(false);
          setIsRightOpen(false);
        }
      }}
    >
      <NavBody>
        <MenuBtn onClick={() => setIsLeftOpen(true)}>메뉴바</MenuBtn>
        {isLeftOpen && <UserSidebar setIsLeftOpen={setIsLeftOpen} />}
        <LocationName>현재 위치의 지역명</LocationName>
        <FindLocationBtn onClick={() => setIsRightOpen(true)}>
          위치찾기
        </FindLocationBtn>
        {isRightOpen && <LocationSidebar setIsRigthOpen={setIsRightOpen} />}
      </NavBody>
    </BodyBox>
  );
};

export default Nav;

const BodyBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
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

const MenuBtn = styled.button``;

const LocationName = styled.div``;

const FindLocationBtn = styled.button``;
