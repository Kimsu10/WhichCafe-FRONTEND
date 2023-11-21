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
          <ModalImage src={selectedImage} />
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
  height: 200px;
  overflow-x: auto;
`;

const Slide = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
`;

const CafePhotos = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const ModalBox = styled.div`
  position: absolute;
  top: 100%;
  left: -7%;
  width: 114%;
  height: 650px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalImage = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  object-fit: contain;
`;

const Notification = styled.p`
  font-size: 1.2em;
  padding-top: 1em;
`;
