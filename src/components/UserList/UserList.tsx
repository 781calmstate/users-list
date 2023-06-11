import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="users-list">
        <AnimatePresence>
          {sortedAndSearched.map((user) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="item"
            >
              <UserItem
                user={user}
                setIsEditing={setIsEditing}
                setIsDeleting={setIsDeleting}
                setId={setId}
                setCurrentUser={setCurrentUser}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default UserList;
