import styled from 'styled-components';

const CafeInfoMarker = ({ cafeData, searchCafeData }) => {
  console.log(cafeData);
  console.log(searchCafeData);

  return (
    <div>
      {searchCafeData.map(cafe => (
        <CafeInfoBody key={cafe.cafe_id}>
          <CafeInfoImage
            src={cafe.cafe_photo || '/default-placeholder-image.jpg'}
            alt="Cafe Photo"
          />
          <CafeInfoName>{cafe.cafe_name}</CafeInfoName>
        </CafeInfoBody>
      ))}
    </div>
  );
};

export default CafeInfoMarker;

const CafeInfoBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5em;
  gap: 10px;
  width: 110px;
  height: 100px;
  background-color: #c8c8c8;
`;

const CafeInfoImage = styled.img`
  width: 70px;
  height: 60px;
  border-radius: 0.5em;
  object-fit: cover;
`;

const CafeInfoName = styled.h5`
  color: #2557a2;
`;
