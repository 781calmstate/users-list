import React, { useState } from 'react';
import { User } from '../../types/model';
import { Link } from 'react-router-dom';
import '../styles/UsersPage.css';

type Props = {
  user: User;
};

const UserItem: React.FC<Props> = ({ user }) => {
  const [isEdited, setIsEdited] = useState(false);
  const { id, name, username } = user;

  return (
    <div className={`users-list__item ${isEdited ? 'edited' : ''}`}>
      <span className="item__id">{id}</span>
      <span className="item__name">{name}</span>
      <span className="item__username">{username}</span>

      <div className="item__buttons">
        <Link
          to={`/users-list/user/${id}`}
          className="item__button button__about"
        >
          About
        </Link>
        <button className="item__button button__edit">Edit</button>
        <button className="item__button button__delete">Delete</button>
      </div>
    </div>
  );
};

export default UserItem;
