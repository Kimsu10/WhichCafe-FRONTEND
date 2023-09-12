import styled from 'styled-components';

const CafeDetail = () => {
  return (
    <CafeDetailBody>
      <CafeSiteLink>카페 사이트 : 있으면 넣고 없으면 안뜨게</CafeSiteLink>
      <CafeMenu>카페메뉴: 카페 메뉴가 있는 카페를 아직 못봄</CafeMenu>
      <Reviews> 리뷰 컴포넌트 </Reviews>
    </CafeDetailBody>
  );
};

export default CafeDetail;

const CafeDetailBody = styled.div``;

const CafeSiteLink = styled.div``;

const CafeMenu = styled.div``;

/**
 * 리뷰컴포넌트 작성후 사용할때 지우기
 */
const Reviews = styled.ul``;
