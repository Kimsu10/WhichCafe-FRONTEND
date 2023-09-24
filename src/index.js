import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import store from './Store/store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './Router';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </Provider>
  </CookiesProvider>,
);

axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.withCredentials = true;

//CookiesProvider 와 Provider를 선언하여 Cookie와 Redux를 사용.
