import { styled, keyframes } from 'styled-components';

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(30%);
}
to {
  opacity: 1;
  transform: translateX(0);

}
`;

const LocationSidebar = ({ setIsRightOpen }) => {
  return (
    <BodyBox>
      <SlideBox>
        <PageTitle>위치 찾기</PageTitle>
        <SelectBox>
          <SelectProvince value="도" name="do" id="do-select" />
          <SelectCity value="시,구" name="si" id="si-select" />
          <SelectDong value="동" name="si" id="si-select" />
        </SelectBox>
        <ConfirmBox>
          <ConfirmBtn>검색</ConfirmBtn>
          <CloseBtn onClick={() => setIsRightOpen(false)}>메인으로</CloseBtn>
        </ConfirmBox>
      </SlideBox>
    </BodyBox>
  );
};

export default LocationSidebar;

const BodyBox = styled.div``;

const SlideBox = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${props => props.theme.mainColor};
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  text-align: center;
  animation: ${fadeIn} 0.7s ease;
  z-index: 9999;
  color: ${props => props.theme.subColor};
`;

const PageTitle = styled.h2`
  margin: 1em 0 2em 0;
`;

const SelectBox = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
  height: 50%;
`;

const SelectProvince = styled.select``;

const SelectCity = styled.select``;

const SelectDong = styled.select``;

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50%;
  width: 85%;
  margin: 0 auto;
`;

const ConfirmBtn = styled.button`
  height: 2.5em;
  border-radius: 0.5em;
  background-color: ${props => props.theme.subColor};
  color: ${props => props.theme.mainColor};
`;

const CloseBtn = styled.button`
  margin-top: 1em;
  color: ${props => props.theme.subColor};
`;
