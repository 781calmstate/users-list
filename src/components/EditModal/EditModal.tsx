import React from 'react';
import { User } from '../../types/model';

type Props = {
  editUser: (e: React.FormEvent, currentUser: User, id: string) => void;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  users: User[];
  currentUser: User;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const EditModal: React.FC<Props> = ({
  editUser,
  setIsEditing,
  id,
  users,
  currentUser,
  handleEditChange,
}) => {
  const clickedUser = users.find((user) => user.id === id);

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
          </label>
        </form>
        <div className="modal__footer">
          {' '}
          <button
            className="saveBtn modal__footer-button"
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
