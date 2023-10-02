import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Mypage = () => {
  const [userData, setUserData] = useState();
  //만들어야할것
  //유저 정보 요청 함수
  useEffect(() => {
    fetch(`/data/userData.json`)
      .then(res => res.json())
      .then(data => setUserData(data));
  }, []);
  //닉네입 변경 요청 함수
  const ChangeNick = () => {};
  //비밀번호 변경 요청 함수
  const ChangePW = () => {};

  return (
    <MypageBody>
      <UserDataBody>
        <UserAccount>ID: {userData?.data.account}</UserAccount>
        <UserNickName>
          닉넴임: {userData?.data.nickname} 님
          <ChangeBtn onClick={ChangeNick}>변경</ChangeBtn>
        </UserNickName>
        <UserPassword>
          비밀번호: <ChangePassword />
          <ChangeBtn onClick={ChangePW}>변경</ChangeBtn>
        </UserPassword>
        <ChangePassword2 />
        <PasswordQuestion>나의 출신 초등학교이름은?</PasswordQuestion>
        <PasswordAnswer>{userData?.data.passwordQuestion}</PasswordAnswer>
      </UserDataBody>
      <Link to="/">
        <GotoMain>메인으로</GotoMain>
      </Link>
    </MypageBody>
  );
};

export default Mypage;

// 공통되는 css 부분을 나중에 style로 다 빼버리자.
const MypageBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 768px;
  height: 100vh;
  background-color: #f7f0e0c9;
  margin: 0 auto;
  border-top: 1px solid #efeae0;
  padding: 2em;
  font-size: 19px;
`;

const UserDataBody = styled.div`
  width: 700px;
  height: 350px;
  padding: 1em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const UserAccount = styled.p``;

const UserNickName = styled.p``;

const UserPassword = styled.div``;

const ChangePassword = styled.input`
  width: 300px;
`;

const ChangePassword2 = styled.input`
  width: 300px;
`;

const ChangeBtn = styled.button`
  font-size: 19px;
  background-color: ${props => props.theme.mainColor};
  border-radius: 0.8em;
  margin-left: 1.1em;
`;

const PasswordQuestion = styled.p``;

const PasswordAnswer = styled.p``;

const GotoMain = styled.button`
  text-align: left;
  font-size: 19px;
  padding: 0.5em 1em;
  color: ${props => props.theme.mainColor};
`;
