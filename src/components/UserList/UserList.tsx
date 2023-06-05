import React from 'react';

import { User } from '../../types/model';

import UserItem from '../UserItem/UserItem';

type Props = {
  sortedAndSearched: User[];
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  setId: React.Dispatch<React.SetStateAction<string>>;
};

const UserList: React.FC<Props> = ({
  sortedAndSearched,
  setIsDeleting,
  setId,
}) => {
  return (
    <div className="users-list">
      {sortedAndSearched.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          setIsDeleting={setIsDeleting}
          setId={setId}
        />
      ))}
    </div>
  );
};

export default UserList;
