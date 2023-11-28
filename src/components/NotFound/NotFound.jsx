import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundBody>
      <CafeImage src="/images/404.png" />
      <Link to="/">
        <GotoMain>메인페이지로</GotoMain>
      </Link>
    </NotFoundBody>
  );
};
export default NotFound;

const NotFoundBody = styled.div`
  background-color: #f7f0e0c9;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em 2em;
  width: 768px;
  margin: 0 auto;
  position: relative;
`;

const CafeImage = styled.img`
  width: 768px;
`;

const GotoMain = styled.h4`
  font-size: 1.3em;
  text-align: center;
  position: absolute;
  color: white;
  top: 75%;
  left: 42%;
`;
