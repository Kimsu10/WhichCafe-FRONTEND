import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './AuthStore';

//state들을 보관하는 리덕스의 빈 저장소 생성 & 내보내기
export default configureStore({
  reducer: {
    token: tokenReducer,
  },
});
