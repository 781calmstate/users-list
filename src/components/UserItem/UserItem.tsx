import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { User } from '../../types/model';

type Props = {
  user: User;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const UserItem: React.FC<Props> = ({ user, setIsDeleting, setId }) => {
  const [isEdited, setIsEdited] = useState(false);
  const { id, name, username } = user;

  const handleDelete = (id: string) => {
    setIsDeleting(true);

    setId(id);
  };

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
        <button
          className="item__button button__delete"
          onClick={() => handleDelete(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
