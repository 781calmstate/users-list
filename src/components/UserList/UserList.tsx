import React from 'react';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { User } from '../../types/model';

import UserItem from '../UserItem/UserItem';

type Props = {
  sortedAndSearched: User[];
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserList: React.FC<Props> = ({
  sortedAndSearched,
  setIsEditing,
  setIsDeleting,
  setId,
  setCurrentUser,
}) => {
  return (
    <div>
      <TransitionGroup className="users-list">
        {sortedAndSearched.map((user) => (
          <CSSTransition key={user.id} timeout={1000} classNames="item">
            <UserItem
              user={user}
              setIsEditing={setIsEditing}
              setIsDeleting={setIsDeleting}
              setId={setId}
              setCurrentUser={setCurrentUser}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default UserList;
