import React, { useEffect } from 'react';
import { User } from '../../types/model';

type Props = {
  id: number;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

const DeleteModal: React.FC<Props> = ({
  setIsDeleting,
  id,
  users,
  setUsers,
}) => {
  const currentUser = users.find((user) => user.id === id);

  const handleDelete = () => {
    setUsers(users.filter((user) => user.id !== id));

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
