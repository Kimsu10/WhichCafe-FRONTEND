import { styled } from 'styled-components';

const Main = () => {
  return (
    <MainBody>
      <SAID>
        oh yeah
        <br />i can start!
      </SAID>
    </MainBody>
  );
};

export default Main;

const MainBody = styled.div`
  background-color: aqua;
`;

const SAID = styled.ul`
  background-color: beige;
`;
