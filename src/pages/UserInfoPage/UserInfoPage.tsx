import React, { useContext, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { IoMdArrowBack } from 'react-icons/io';
import { FiArrowRight } from 'react-icons/fi';

import { UsersContext } from '../../context';

import { User } from '../../types/model';

import '../../styles/UserInfoPage.css';

const UserInfoPage: React.FC = () => {
  const [users, setUsers] = useContext(UsersContext);

  const { id } = useParams();

  const userId = Number(id);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('usersData') || '[]');
    console.log(usersData);
    if (!users.length) {
      setUsers(usersData);
      return;
    }
  }, []);

  const user = users.find((user: User) => Number(user.id) == userId);

  if (!user) {
    return <div>Not Found</div>;
  }

  const { name, username, email, phone, company } = user;
  const { city } = user.address;

  const nextUser = users.find((user: User) => Number(user.id) > userId);
  const prevUser = [...users]
    .sort((p1, p2) => p2.id - p1.id)
    .find((user) => Number(user.id) < userId);

  return (
    <section>
      <div className="userpage">
        <div className="userpage__header">
          <Link
            to={`/users-list/users/${prevUser ? prevUser.id : userId}`}
            className={`header__NavBtns prevUser ${prevUser ? '' : 'disabled'}`}
          >
            <IoMdArrowBack />
          </Link>
          <h1 className="header__title">{name}</h1>
          <Link
            to={`/users-list/users/${nextUser ? nextUser.id : userId}`}
            className={`header__NavBtns nextUser ${nextUser ? '' : 'disabled'}`}
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
        <Link to="/users-list/users">
          <button className="nav-button prevpage userpage__returnBtn"></button>
        </Link>
      </div>
    </section>
  );
};

export default UserInfoPage;
