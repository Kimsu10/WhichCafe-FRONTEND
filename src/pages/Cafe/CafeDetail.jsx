import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CafeDetail = ({ cafePhotos }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const modalRef = useRef();

  const handleOutsideClick = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (modalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [modalOpen]);

  const openModal = i => {
    setSelectedImage(i);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const next = () => {
    const currentIndex = cafePhotos.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % cafePhotos.length;
    setSelectedImage(cafePhotos[nextIndex]);
  };

  const previous = () => {
    const currentIndex = cafePhotos.indexOf(selectedImage);
    const previousIndex =
      (currentIndex - 1 + cafePhotos.length) % cafePhotos.length;
    setSelectedImage(cafePhotos[previousIndex]);
  };

  return (
    <CafeDetailBody>
      <SliderContainer>
        {cafePhotos.map((photo, i) => (
          <Slide key={i} onClick={() => openModal(photo)}>
            {photo !== null ? (
              <CafePhotos src={photo} alt={`Cafe ${i + 1}`} />
            ) : (
              <Notification>사진이 없습니다.</Notification>
            )}
          </Slide>
        ))}
      </SliderContainer>
      {modalOpen && selectedImage !== null && (
        <ModalBox ref={modalRef}>
          <CloseBtn onClick={() => setModalOpen(false)}>✕</CloseBtn>
          <NavButton onClick={previous}>◀︎</NavButton>
          <ModalImage src={selectedImage} />
          <NavButton onClick={next}>▶</NavButton>
        </ModalBox>
      )}
    </CafeDetailBody>
  );
};

export default CafeDetail;

const CafeDetailBody = styled.div`
  padding: 0.5em;
  position: relative;
`;

const SliderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 250px;
  overflow-x: auto;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
`;

const CafePhotos = styled.img`
  margin-top: 1.5em;
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ModalBox = styled.div`
  position: absolute;
  top: -60%;
  left: -7%;
  width: 114%;
  height: 435px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalImage = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
  object-fit: contain;
`;

const Notification = styled.p`
  font-size: 1.2em;
  padding-top: 1em;
`;

const NavButton = styled.button`
  margin: 0 1.5em;
  font-size: 1.5em;
`;

const CloseBtn = styled.button`
  font-size: 1.5em;
  position: absolute;
  right: 2%;
  top: 2%;
`;
