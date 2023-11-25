import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './Store/store';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from 'styled-components';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './Router';

export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </CookiesProvider>,
);

//CookiesProvider 와 Provider를 선언하여 Cookie와 Redux를 사용.
