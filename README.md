# <p align="center"> **카페어디**
<P align="center"> 현재위치 근처와 검색된 지역의 24시 카페가 어디있는지 찾아주는 서비스
<P align="center">📆 2023.09.04 ~

## 시연영상

---
#### FE
![](https://img.shields.io/badge/-JavaScript-yellow?style=flat&logo=JavaScript&logoColor=white)
![](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=React&logoColor=white)
![](https://img.shields.io/badge/styledcomponent-DB7093?flat&logo=styled-components&logoColor=white)
![](https://img.shields.io/badge/vercel-white?flat&logo=vercel&logoColor=black)

---

## 아키텍처
![Sequence_whichcafe](https://github.com/devdev2022/WhichCafe/blob/main/projectmaterial/Architecture.drawio.png)

## ERD
![ERD_whichcafe](https://github.com/devdev2022/WhichCafe/blob/main/projectmaterial/ERD.png)

## 구현한 것
#### 1. 메인페이지

- KakaoMap을 불러와서 백과 통신하여 지도에 표시
- infowindow와 customOverlay를 혼합한 정보표시 창
- 백과 통신하여 검색된 위치의 카페정보를 불러오고  

#### 2. Nav & 로그인/회원가입/비밀번호찾기/즐겨찾기
- keyframe과 모달창을 사용하여 클린된 버튼에 맞는 모달창이 슬라이드되도록 구현
- 

#### 3. 리프레시 토큰과 엑세스토큰을 사용한 로그인 상태 갱신
- react-redux를 사용하여 accessToken을 저장 및 삭제
- httpOnly를 사용하여 cookie의 refreshToken을 전달
- 엑세스토큰 만료 1분 전이거나 만료시 리프레시 토큰이 존재하면 만료된 엑세스토큰과 리프레시 토큰을 보내 새로운 엑세스토큰 발급

#### 4. 마이페이지 & 회원탈퇴
-
-

## 어려웠던 점
- 동기/비동기

## 배운점
- 동기/ 비동기의 차이점과 async/await을 사용하지 않을때 발생하는 문제
- accessToken과 refreshToken을 사용하는 이유와 방법
- local Storage에 저장해도 안전하게 암호화하는 방법
- Cors 에러의 발생 원인과 발생시 임시 대처하는 방법

  
## 아쉬운 점

#### 지저분한 코드
- 처음 프로젝트를 기획했을때는 정말 간단한 프로젝트여서 hook분리를 하지않았는데 지금보니 중복되는 코드가 너무 많다.

## 느낀점
  
