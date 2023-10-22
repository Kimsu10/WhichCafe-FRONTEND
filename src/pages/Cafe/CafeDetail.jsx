import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const CafeDetail = ({ cafePhotos, searchCafeData }) => {
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

  console.log(searchCafeData);

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
            <CafePhotos src={photo} alt={`Cafe ${i + 1}`} />
          </Slide>
        ))}
      </SliderContainer>
      {modalOpen && (
        <ModalBox ref={modalRef}>
          <ModalContent>
            <ModalImage src={[selectedImage]} alt="카페 세부 이미지" />
          </ModalContent>
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

const ModalContent = styled.div`
  background: ${props => props.theme.subColor};
  padding: 5px;
  border-radius: 10px;
`;

const ModalImage = styled.img`
  width: 500px;
  height: 500px;
  border-radius: 10px;
  object-fit: contain;
`;

//슬라이드로 구현
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import styled from 'styled-components';

// const CafeDetail = ({ cafePhotos }) => {
//   const settings = {
//     infinite: true,
//     slidesToScroll: 1,
//     speed: 500,
//     slidesToShow: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <CafeDetailBody>
//       <Slider {...settings}>
//         {cafePhotos.map((photoSrc, index) => (
//           <Slide key={index}>
//             <CafePhoto src={photoSrc} alt="카페세부 이미지" />
//           </Slide>
//         ))}
//       </Slider>
//     </CafeDetailBody>
//   );
// };

// export default CafeDetail;

// const CafeDetailBody = styled.div`
//   padding: 1em;
//   width: 500px;
//   height: 440px;
//   margin: 0 auto;
// `;

// const Slide = styled.div`
//   width: 480px;
//   height: 390px;
// `;

// const CafePhoto = styled.img`
//   width: 465px;
//   height: 400px;
//   object-fit: cover;
// `;
