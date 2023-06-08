import React, { useContext } from 'react';

import { User } from '../../types/model';
import { UsersContext } from '../../context';

type Props = {
  editUser: (e: React.FormEvent, currentUser: User, id: string) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  currentUser: User;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditModal: React.FC<Props> = ({
  editUser,
  setIsEditing,
  id,
  currentUser,
  handleEditChange,
}) => {
  const [users] = useContext(UsersContext);

  const clickedUser = users.find((user: User) => user.id === id);

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
            onClick={(e) => editUser(e, currentUser, id)}
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

export default EditModal;
