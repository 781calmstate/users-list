import React from 'react';
import { User } from '../../types/model';

type Props = {
  addUser: (e: React.FormEvent, newUser: User) => void;
  newUser: User;
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddModal: React.FC<Props> = ({
  addUser,
  setIsAdding,
  handleAddChange,
  newUser,
}) => {
  return (
    <div className="backshadow">
      <div className="modal">
        <h1 className="modal__header">Add new user</h1>
        <form className="modal__inputs">
          <label htmlFor="name" className="modal__label">
            Name <br />
            <input
              value={newUser.name}
              type="text"
              name="name"
              className="modal__inputField"
              onChange={handleAddChange}
            />
          </label>
          <label htmlFor="username" className="modal__label">
            Username <br />
            <input
              value={newUser.username}
              type="text"
              name="username"
              className="modal__inputField"
              onChange={handleAddChange}
            />
          </label>
        </form>
        <div className="modal__footer">
          {' '}
          <button
            className="saveBtn modal__footer-button"
            onClick={(e) => addUser(e, newUser)}
          >
            Save
          </button>
          <button
            className="cancelBtn modal__footer-button"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
