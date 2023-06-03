import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../types/model';
import SortingMenu from '../../SortingMenu/SortingMenu';
import UserItem from '../../UserItem/UserItem';
import '../../styles/UsersPage.css';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [user, setUser] = useState<User>({ id: 0, name: '', username: '' });
  const [filter, setFilter] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
    };
    dataFetch();
  }, []);

  useEffect(() => {
    console.log(
      users.filter((user) => {
        return filter
          ? user.name.toLowerCase().includes(filter) ||
              user.username.toLowerCase().includes(filter)
          : true;
      })
    );
  }, [filter]);
  // const maxId = [...users].sort((p1, p2) => p2.id - p1.id)[0].id;
  return (
    <div className="userspage">
      <button className="addBtn">Add User</button>

      <div className="searchAndSort">
        {' '}
        <form className="input">
          <input
            type="input"
            className="input__field"
            placeholder="Enter a name"
            value={filter}
            onChange={handleChange}
          />
        </form>
        <SortingMenu />
      </div>
      <div className="users-list">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      <Link to="/users-list">
        <button className="nav-button prevpage"></button>
      </Link>
    </div>
  );
};

export default UsersPage;
