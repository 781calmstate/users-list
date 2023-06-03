import React from 'react';
import contentImage from '../../../img/background/welcome.jpg';
import usersImage from '../../../img/icons/users.png';
import '../../styles/WelcomePage.css';
import { Link } from 'react-router-dom';

const WelcomePage: React.FC = () => {
  return (
    <div className="welcomepage">
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
    </div>
  );
};

export default WelcomePage;
