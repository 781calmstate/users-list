import React from 'react';

import { AnimatePresence } from 'framer-motion';

import { Route, Routes, useLocation } from 'react-router-dom';

import { NotFoundPage, UserInfoPage, UsersPage, WelcomePage } from './pages';

import './styles/App.css';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/users-list" element={<WelcomePage />} />
          <Route path="/users-list/users" element={<UsersPage />} />
          <Route path="/users-list/users/:id" element={<UserInfoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
