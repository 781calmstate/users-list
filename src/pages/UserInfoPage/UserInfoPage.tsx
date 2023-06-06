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

  const user = users.find((user: User) => Number(user.id) === Number(id));

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
          <button className="header__btns prevUser">
            {/* <Link to> */}
            <IoMdArrowBack />
            {/* </Link> */}
          </button>
          <h1 className="header__title">{name}</h1>
          <button className="header__btns nextUser">
            <FiArrowRight />
          </button>
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
