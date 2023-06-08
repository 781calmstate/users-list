import React, { useContext } from 'react';

import { UsersContext } from '../../context';

import { User } from '../../types/model';

type Props = {
  id: string;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal: React.FC<Props> = ({ setIsDeleting, id }) => {
  const [users, setUsers] = useContext(UsersContext);

  const currentUser = users.find((user: User) => user.id === id);

  const handleDelete = () => {
    const filteredUsers = users.filter((user: User) => user.id !== id);
    setUsers(filteredUsers);
    localStorage.setItem('usersData', JSON.stringify(filteredUsers));
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
