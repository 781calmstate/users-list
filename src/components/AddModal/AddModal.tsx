import React from 'react';

type Props = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AddModal: React.FC<Props> = ({ setIsAdding, handleModalChange }) => {
  return (
    <div className="backshadow">
      <div className="modal">
        <h1 className="modal__header">Add new user</h1>
        <form className="modal__inputs">
          <label htmlFor="name" className="modal__label">
            Name <br />
            <input
              type="text"
              name="name"
              className="modal__inputField"
              onChange={handleModalChange}
            />
          </label>
          <label htmlFor="username" className="modal__label">
            Username <br />
            <input
              type="text"
              name="username"
              className="modal__inputField"
              onChange={handleModalChange}
            />
          </label>
        </form>
        <div className="modal__footer">
          {' '}
          <button className="saveBtn modal__footer-button">Save</button>
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
