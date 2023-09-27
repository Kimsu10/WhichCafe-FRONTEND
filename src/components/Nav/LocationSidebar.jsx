// import { useState } from 'react';
// import { styled, keyframes } from 'styled-components';

// const fadeIn = keyframes`
// from {
//   opacity: 0;
//   transform: translateX(30%);
// }
// to {
//   opacity: 1;
//   transform: translateX(0);

// }
// `;

// const LocationSidebar = ({ setIsRightOpen }) => {
//   const [location, setLocation] = useState([]);
//   const [selectValues, setSelectValues] = useState({
//     do_si: '도,시',
//     si_gu: '시,구',
//     dong: '동',
//   });

//   fetch('/data/locationData.json')
//     .then(res => res.json())
//     .then(data => setLocation(data.data), []);

//   const handleSelectChange = e => {
//     const { name, value } = e.target;
//     setSelectValues({
//       ...selectValues,
//       [name]: value,
//     });
//   };

//   return (
//     <BodyBox>
//       <SlideBox>
//         <PageTitle>위치 찾기</PageTitle>
//         <SelectBox>
//           <SelectProvince>
//             value={selectValues.do_si}
//             name="do_si" id="do-select" onChange={handleSelectChange}
//             <option value="도,시">도,시{location}</option>
//             {/* {location.map(el => (
//               <option key={el.id} value={el.doSi}>
//                 {el.doSi}
//               </option>
//             ))} */}
//           </SelectProvince>
//           <SelectCity>
//             value={selectValues.si_gu}
//             name="si_gu" id="si-select" onChange={handleSelectChange}
//             <option value="시,구">시,구</option>
//             {/* {location
//               .find(el => el.DoSi === selectValues.do_si)
//               ?.SiGu.map(el => (
//                 <option key={el.id} value={el.name}>
//                   {el.name}
//                 </option>
//               ))} */}
//           </SelectCity>
//           <SelectDong>
//             value={selectValues.dong} name="dong" id="dong-select" onChange=
//             {handleSelectChange}
//             <option value="동">동</option>
//             {/* {location
//               .find(el => el.DoSi === selectValues.do_si)
//               ?.SiGu.find(el => el.name === selectValues.si_gu)
//               ?.dong.map(el => (
//                 <option key={el.id} value={el.name}>
//                   {el.name}
//                 </option>
//               ))} */}
//           </SelectDong>
//         </SelectBox>
//         <ConfirmBox>
//           <ConfirmBtn>검색</ConfirmBtn>
//           <CloseBtn onClick={() => setIsRightOpen(false)}>메인으로</CloseBtn>
//         </ConfirmBox>
//       </SlideBox>
//     </BodyBox>
//   );
// };

// export default LocationSidebar;

// const BodyBox = styled.div``;

// const SlideBox = styled.div`
//   width: 100%;
//   height: 100vh;
//   background-color: ${props => props.theme.mainColor};
//   position: absolute;
//   top: 0;
//   right: 0;
//   padding: 1em;
//   text-align: center;
//   animation: ${fadeIn} 0.7s ease;
//   z-index: 9999;
//   color: ${props => props.theme.subColor};
// `;

// const PageTitle = styled.h2`
//   margin: 1em 0 2em 0;
// `;

// const SelectBox = styled.div`
//   display: grid;
//   justify-els: center;
//   grid-template-columns: repeat(3, 1fr);
//   grid-gap: 1em;
//   height: 50%;
// `;

// const SelectProvince = styled.select``;

// const SelectCity = styled.select``;

// const SelectDong = styled.select``;

// const ConfirmBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   height: 50%;
//   width: 85%;
//   margin: 0 auto;
// `;

// const ConfirmBtn = styled.button`
//   height: 2.5em;
//   border-radius: 0.5em;
//   background-color: ${props => props.theme.subColor};
//   color: ${props => props.theme.mainColor};
// `;

// const CloseBtn = styled.button`
//   margin-top: 1em;
//   color: ${props => props.theme.subColor};
// `;
