import React, { useContext } from 'react';

import { UsersContext } from '../../context';

const UserInfoPage: React.FC = () => {
  const [users, setUsers] = useContext(UsersContext);

  return <div></div>;
};

export default UserInfoPage;
