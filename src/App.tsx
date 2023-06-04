import React from 'react';

import { Route, Routes } from 'react-router-dom';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './styles/App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/users-list" element={<WelcomePage />} />
        <Route path="/users-list/users" element={<UsersPage />} />
        <Route path="/users-list/user/:id" element={<UserInfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
