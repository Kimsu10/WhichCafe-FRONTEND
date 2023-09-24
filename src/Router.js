import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Nav from './components/Nav/Nav';
import Like from './pages/Like/Like';
import Login from './pages/User/Login';
import Signup from './pages/User/Signup';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/like" element={<Like />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
