import React from 'react';

import { IUser } from '../../types/model';

import { useAppDispatch, useAppSelector } from '../../hooks';

import * as usersActions from '../../redux/store/slices/usersSlice';

import './style.css';

type TDeleteModalProps = {
  id: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteModal = ({
  setIsDeleting,
  id,
}: TDeleteModalProps): JSX.Element => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const currentUser = users.find((user: IUser) => user.id === id);

  if (!currentUser) {
    return <div>Something went wrong..</div>;
  }

  const handleDelete = () => {
    dispatch(usersActions.remove(currentUser));

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
