import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './AuthStore';
import accountReducer from './accountReducer';

//state들을 보관하는 리덕스의 빈 저장소 생성 & 내보내기
export default configureStore({
  reducer: {
    token: tokenReducer,
    account: accountReducer,
  },
});

//새로만든 함수
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import tokenReducer, { handleTokenExpiration } from './AuthStore';
// import thunk from 'redux-thunk';

// const store = configureStore({
//   reducer: {
//     token: tokenReducer,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(thunk, handleTokenExpiration),
// });

// export default store;
