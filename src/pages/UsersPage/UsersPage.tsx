import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { User } from '../../types/model';

import AddModal from '../../components/AddModal/AddModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import EditModal from '../../components/EditModal/EditModal';
import SortingMenu from '../../components/SortingMenu/SortingMenu';
import UserItem from '../../components/UserItem/UserItem';

import '../../styles/UsersPage.css';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [user, setUser] = useState<User>({ id: 0, name: '', username: '' });
  const [filter, setFilter] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [id, setId] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === ' ') {
      return;
    }

    // setUsers(prev => ({ ...prev, []}))
  };

  const showAddModal = () => {
    setIsAdding(true);
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
    console.log(users);
  }, [filter, users]);
  // const maxId = [...users].sort((p1, p2) => p2.id - p1.id)[0].id;
  return (
    <div className="userspage">
      <button className="addBtn" onClick={showAddModal}>
        Add User
      </button>

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
          <UserItem
            key={user.id}
            user={user}
            setIsDeleting={setIsDeleting}
            setId={setId}
          />
        ))}
      </div>
      <Link to="/users-list">
        <button className="nav-button prevpage"></button>
      </Link>
      {isAdding && (
        <AddModal
          setIsAdding={setIsAdding}
          handleModalChange={handleModalChange}
        />
      )}
      {isEditing && <EditModal id={id} />}
      {isDeleting && (
        <DeleteModal
          id={id}
          setIsDeleting={setIsDeleting}
          users={users}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default UsersPage;
