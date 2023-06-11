import React, { useState } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Route, Routes, useLocation } from 'react-router-dom';

import { User } from './types/model';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './styles/App.css';
import { UsersContext } from './context';

const App: React.FC = () => {
  const location = useLocation();

  const [users, setUsers] = useState<User[]>([]);

  return (
    <div className="App">
      <UsersContext.Provider value={[users, setUsers]}>
        <AnimatePresence>
          <Routes location={location} key={location.pathname}>
            <Route path="/users-list" element={<WelcomePage />} />
            <Route path="/users-list/users" element={<UsersPage />} />
            <Route path="/users-list/users/:id" element={<UserInfoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AnimatePresence>
      </UsersContext.Provider>
    </div>
  );
};

export default App;
