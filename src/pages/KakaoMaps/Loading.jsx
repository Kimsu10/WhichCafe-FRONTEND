import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <Loader />
      <InnerPin />
      <LoaderName>현재위치를 불러오는 중</LoaderName>
    </LoadingWrapper>
  );
};

export default Loading;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a5a5a5;
  width: 768px;
  height: 450px;
  z-index: 9999;
  position: absolute;
  top: 0;
`;

const Loader = styled.div`
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: ${rotate} 2s linear infinite;
  position: relative;
`;

const InnerPin = styled.img`
  width: 25px;
  height: 25px;
  border: 6px solid #f84b4b;
  background-color: #f3f3f3;
  border-radius: 50% 50% 0;
  transform: rotate(42deg);
  position: absolute;
  left: 27.1%;
`;

const InnerPerson = styled.img`
  width: 20px;
  height: 20px;
  animation: ${rotate} 2s linear infinite;
`;

const LoaderName = styled.h1`
  color: beige;
  margin-left: 1em;
`;
