import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import WelcomePage from './components/pages/WelcomePage/WelcomePage';
import UsersPage from './components/pages/UsersPage/UsersPage';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import UserInfoPage from './components/pages/UserInfoPage/UserInfoPage';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/user/:id" element={<UserInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
