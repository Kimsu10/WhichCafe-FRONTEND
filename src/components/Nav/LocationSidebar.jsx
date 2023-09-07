import { styled } from 'styled-components';

const LocationSidebar = ({ setIsRigthOpen }) => {
  return (
    <BodyBox>
      <SlideBox>
        <PageTitle>위치 찾기</PageTitle>
        <CloseBox>
          <CloseBtn onClick={() => setIsRigthOpen(false)}>✕</CloseBtn>
        </CloseBox>
        <SelectBox>
          <SelectProvince value="도" name="do" id="do-select" />
          <SelectCity value="시,구" name="si" id="si-select" />
          <SelectDong value="동" name="si" id="si-select" />
        </SelectBox>
        <ConfirmBox>
          <ConfirmBtn>검색</ConfirmBtn>
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
  background-color: #d2eaf7;
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  text-align: center;
`;

const PageTitle = styled.h2``;

const CloseBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const CloseBtn = styled.button``;

const SelectBox = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1em;
`;

const SelectProvince = styled.select``;

const SelectCity = styled.select``;

const SelectDong = styled.select``;

const ConfirmBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const ConfirmBtn = styled.button`
  height: 2.5em;

  border-radius: 0.5em;
  background-color: #0099ff;
  color: white;
`;
