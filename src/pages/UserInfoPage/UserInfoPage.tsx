import React, { useEffect } from 'react';

import { motion } from 'framer-motion';

import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import { IoMdArrowBack } from 'react-icons/io';

import { useAppDispatch, useAppSelector } from '../../hooks';

import * as usersActions from '../../redux/store/slices/usersSlice';

import { IUser } from '../../types/model';

import './style.css';
import '../../styles/nav-buttons.css';

export const UserInfoPage = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const userId = Number(id);

  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem('usersData') || '[]');
    if (!users.length) {
      dispatch(usersActions.getUsers(usersData));
      return;
    }
  }, []);

  const user = users.find((user: IUser) => Number(user.id) == userId);

  if (!user) {
    return <div>Not Found</div>;
  }

  const { name, username, email, phone, company, address } = user;

  const nextUser = users.find((user: IUser) => Number(user.id) > userId);
  const prevUser = [...users]
    .sort((a, b) => Number(b.id) - Number(a.id))
    .find((user) => Number(user.id) < userId);

  return (
    <motion.section
      style={{ position: 'absolute' }}
      initial={{ opacity: 0, y: '-100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
    >
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
            {name}, aka {`"${username}"`} currently resides in {address.city}.{' '}
            <br />
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
    </motion.section>
  );
};
