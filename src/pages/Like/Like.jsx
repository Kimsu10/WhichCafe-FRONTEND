import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Like = () => {
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetch(`/data/likeData.json`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => setLikes(data.data));
  }, []);

  const handleUnLike = id => {
    fetch(`${process.env.REACT_APP_API_URL}/likes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
      },
    });
  };

  return (
    <Body>
      <Link to="/">
        <GotoMain>메인으로</GotoMain>
      </Link>
      {likes.map(info => (
        <LikeBody key={info.id}>
          <CafeImage src={info.image} />
          <CafeName>{info.cafeName}</CafeName>
          <CafeLocation>{info.location}</CafeLocation>
          <BtnBox>
            <ShareBtn src="images/share.png" alt="공유하기" />
            <DeleteBtn onClick={() => handleUnLike(info.id)}>✕</DeleteBtn>
          </BtnBox>
        </LikeBody>
      ))}
    </Body>
  );
};

export default Like;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 768px;
  height: 100vh;
  background-color: #f7f0e0c9;
  margin: 0 auto;
  border-top: 1px solid #efeae0;
  padding: 2em;
`;

const GotoMain = styled.button`
  text-align: left;
  padding: 0.5em 1em;
  color: ${props => props.theme.mainColor};
`;

const LikeBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 700px;
  height: 100px;
  padding: 1em;
  border-bottom: 1px solid #e0d9cc;
`;

const CafeImage = styled.img`
  width: 65px;
  height: 65px;
`;

const CafeName = styled.h2`
  color: ${props => props.theme.mainColor};
`;

const CafeLocation = styled.p``;

const BtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
`;

const ShareBtn = styled.img`
  width: 23px;
  height: 23px;
  cursor: pointer;
`;

const DeleteBtn = styled.p`
  color: ${props => props.theme.mainColor};
  font-size: 22px;
  cursor: pointer;
`;
