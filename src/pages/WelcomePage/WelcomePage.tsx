import React from 'react';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import contentImage from '../../img/background/welcome.jpg';
import usersImage from '../../img/icons/users.png';

import '../../styles/WelcomePage.css';

const WelcomePage: React.FC = () => {
  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1.3,
  };

  return (
    <motion.div
      style={{ position: 'absolute' }}
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100vw', zIndex: 500 }}
      transition={pageTransition}
      className="welcomepage"
    >
      <div className="imageblock">
        <img
          src={contentImage}
          alt="Crowd of people wecloming you to website"
        />
      </div>
      <div className="contentblock">
        <div className="contentblock__logo">
          <img src={usersImage} alt="users icon" />
        </div>
        <div className="contentblock__title">Users List</div>
        <div className="contentblock__text">
          Welcome To My User List <br />
          You Can Start By Clicking Button
        </div>
      </div>

      <Link to="/users-list/users">
        {' '}
        <button className="nav-button nextpage" />
      </Link>
    </motion.div>
  );
};

export default WelcomePage;
