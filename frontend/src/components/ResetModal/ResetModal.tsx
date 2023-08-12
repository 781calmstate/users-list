import React from 'react';

import { useAppDispatch } from '../../hooks';

import * as userActions from '../../redux/store/slices/usersSlice';

type TResetModalProps = {
  setIsReseting: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResetModal = ({
  setIsReseting,
}: TResetModalProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(userActions.init());
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
