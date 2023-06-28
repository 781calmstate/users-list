import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { IUser } from '../../types/model';

type TUserItemProps = {
  user: IUser;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
};

const UserItem = ({
  user,
  setIsEditing,
  setIsDeleting,
  setId,
  setCurrentUser,
}: TUserItemProps): JSX.Element => {
  const [isEdited, setIsEdited] = useState(false);

  const { id, name, username } = user;

  const handleDeleteClick = (id: string) => {
    setIsDeleting(true);

    setId(id);
  };

  const handleEditClick = (id: string, user: IUser) => {
    setIsEditing(true);

    setId(id);
    setCurrentUser(user);
    setIsEdited(true);
  };

  return (
    <div className={`users-list__item ${isEdited ? 'edited' : ''}`}>
      <span className="item__id">{id}</span>
      <span className="item__name">{name}</span>
      <span className="item__username">{username}</span>

      <div className="item__buttons">
        <Link
          to={`/users-list/users/${id}`}
          className="item__button button__about"
        >
          About
        </Link>
        <button
          className="item__button button__edit"
          onClick={() => handleEditClick(id, user)}
        >
          Edit
        </button>
        <button
          className="item__button button__delete"
          onClick={() => handleDeleteClick(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserItem;
