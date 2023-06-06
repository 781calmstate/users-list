import React, { useContext, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { IoMdArrowBack } from 'react-icons/io';
import { FiArrowRight } from 'react-icons/fi';

import { UsersContext } from '../../context';

import { User } from '../../types/model';

import '../../styles/UserInfoPage.css';

const UserInfoPage: React.FC = () => {
  const [users] = useContext(UsersContext);

  const { id } = useParams();

  const userId = Number(id);

  const user = users.find((user: User) => Number(user.id) === userId);

  const { name, username, email, phone, company } = user;
  const { city } = user.address;

  // console.log
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <section>
      <div className="userpage">
        <div className="userpage__header">
          <Link
            to={`/users-list/users/${userId - 1}`}
            className="header__NavBtns prevUser"
          >
            <IoMdArrowBack />
          </Link>
          <h1 className="header__title">{name}</h1>
          <Link
            to={`/users-list/users/${userId + 1}`}
            className="header__NavBtns nextUser"
          >
            <FiArrowRight />
          </Link>
        </div>
        <div className="userpage__info">
          <p className="info__text">
            {name}, aka {`"${username}"`} currently resides in {city}. <br />
            {username} working for company named {company.name} <br />
          </p>{' '}
          <h2 className="info__contacts">Contacts:</h2>
          <ul className="info__list">
            <li>email: {email}</li>
            <li>phone: {phone}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default UserInfoPage;
