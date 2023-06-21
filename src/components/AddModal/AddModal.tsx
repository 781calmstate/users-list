import React, { useState } from 'react';

import { User } from '../../types/model';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import * as usersActions from '../../redux/store/slices/usersSlice';

type Props = {
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>;
};

const INITIAL_USER = {
  id: '0',
  name: 'Elizabeth Grande',
  username: 'Eliza',
  email: '',
  phone: '',
  company: { name: '' },
  address: { city: '' },
};

const AddModal: React.FC<Props> = ({ setIsAdding }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const [newUser, setNewUser] = useState<User>(INITIAL_USER);

  const addUser = (e: React.FormEvent, newUser: User) => {
    e.preventDefault();

    if (
      newUser.name.trim().length === 0 ||
      newUser.username.trim().length === 0
    ) {
      return;
    }

    const maxId = [...users].sort((p1, p2) => Number(p2.id) - Number(p1.id))[0]
      .id;
    const numberId = Number(maxId);

    if (newUser) {
      const customUser = {
        id: `${numberId + 1}`,
        name: newUser.name,
        username: newUser.username,
        email: 'Sincere@april.biz',
        phone: '1-770-736-8031 x56442',
        company: { name: 'Hoeger LLC' },
        address: { city: 'London' },
      };

      dispatch(usersActions.toggle(customUser));
    }
    setNewUser(INITIAL_USER);

    setIsAdding(false);
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
    }));
  };

  const isSaveDisabled =
    newUser.name.trim().length === 0 || newUser.username.trim().length === 0;

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
            <div className="providerEror">
              {newUser.name.trim().length === 0 ? 'Please provide name' : ''}
            </div>
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
            <div className="providerEror">
              {newUser.username.trim().length === 0
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
