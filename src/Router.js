import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Nav from './components/Nav/Nav';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Like from './pages/Like/Like';

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
