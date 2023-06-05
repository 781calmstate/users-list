import React from 'react';

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
    <div className="users-list">
      {sortedAndSearched.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          setIsEditing={setIsEditing}
          setIsDeleting={setIsDeleting}
          setId={setId}
          setCurrentUser={setCurrentUser}
        />
      ))}
    </div>
  );
};

export default UserList;
