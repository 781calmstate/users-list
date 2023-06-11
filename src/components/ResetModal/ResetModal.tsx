import React, { useContext } from 'react';
import { UsersContext } from '../../context';

type Props = {
  setIsReseting: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResetModal: React.FC<Props> = ({ setIsReseting }) => {
  const [users, setUsers] = useContext(UsersContext);

  const handleReset = () => {
    localStorage.removeItem('usersData');

    window.location.reload();
    setIsReseting(false);
  };
  return (
    <div className="backshadow">
      <div className="modal">
        <h1 className="modal__header">Reset changes</h1>
        <p className="modal__warning">
          You are going to reset all your changes in user list. This action
          cannot be reverted
        </p>
        <div className="modal__footer">
          {' '}
          <button
            className="deleteModal__deleteBtn modal__footer-button"
            onClick={handleReset}
          >
            Confirm
          </button>
          <button
            className="deleteModal__cancelBtn modal__footer-button"
            onClick={() => setIsReseting(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetModal;
