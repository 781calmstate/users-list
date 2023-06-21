import React from 'react';

import { User } from '../../types/model';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import * as usersActions from '../../redux/store/slices/usersSlice';

type Props = {
  id: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal: React.FC<Props> = ({ setIsDeleting, id }) => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const currentUser = users.find((user: User) => user.id === id);

  if (!currentUser) {
    return null;
  }

  const handleDelete = () => {
    dispatch(usersActions.toggle(currentUser));

    setIsDeleting(false);
  };

  return (
    <div className="backshadow">
      <div className="modal">
        <h1 className="modal__header">Delete {currentUser?.name}</h1>
        <p className="modal__warning">This action cannot be reverted</p>
        <div className="modal__footer">
          {' '}
          <button
            className="deleteModal__deleteBtn modal__footer-button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="deleteModal__cancelBtn modal__footer-button"
            onClick={() => setIsDeleting(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
