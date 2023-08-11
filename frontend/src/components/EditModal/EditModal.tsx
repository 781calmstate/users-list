import React from 'react';

import { IUser } from '../../types/model';

import { useAppDispatch, useAppSelector } from '../../hooks';

import * as usersActions from '../../redux/store/slices/usersSlice';

type TEditModalProps = {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser>>;
  id: string;
  currentUser: IUser;
};

export const EditModal = ({
  setIsEditing,
  id,
  currentUser,
  setCurrentUser,
}: TEditModalProps): JSX.Element => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const clickedUser = users.find((user: IUser) => user.id === id);

  if (!clickedUser) {
    return <div>Something went wrong..</div>;
  }

  const editUser = () => {
    if (
      currentUser.name.trim().length === 0 ||
      currentUser.username.trim().length === 0
    ) {
      return;
    }

    dispatch(usersActions.edit({ ...currentUser, id: clickedUser.id }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === ' ') {
      return;
    }

    setCurrentUser((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    editUser();
    setIsEditing(false);
  };

  const isSaveDisabled =
    currentUser.name.trim().length === 0 ||
    currentUser.username.trim().length === 0;
  return (
    <div className="backshadow">
      <div className="modal">
        <h1 className="modal__header">Edit: {clickedUser?.name}</h1>
        <form className="modal__inputs">
          <label htmlFor="name" className="modal__label">
            Name <br />
            <input
              value={currentUser.name}
              type="text"
              name="name"
              className="modal__inputField"
              onChange={handleEditChange}
            />
            <div className="providerEror">
              {currentUser.name.trim().length === 0
                ? 'Please provide username'
                : ''}
            </div>
          </label>
          <label htmlFor="username" className="modal__label">
            Username <br />
            <input
              value={currentUser.username}
              type="text"
              name="username"
              className="modal__inputField"
              onChange={handleEditChange}
            />
            <div className="providerEror">
              {currentUser.username.trim().length === 0
                ? 'Please provide username'
                : ''}
            </div>
          </label>
        </form>
        <div className="modal__footer">
          {' '}
          <button
            disabled={isSaveDisabled}
            className={`saveBtn modal__footer-button ${
              isSaveDisabled ? 'disabled' : ''
            }`}
            onClick={handleSubmit}
          >
            Save
          </button>
          <button
            className="cancelBtn modal__footer-button"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
