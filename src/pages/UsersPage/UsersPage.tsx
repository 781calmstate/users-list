import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Filter, User } from '../../types/model';

import { useUsers } from '../../hooks/useUsers';

import AddModal from '../../components/AddModal/AddModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import EditModal from '../../components/EditModal/EditModal';
import SortingMenu from '../../components/SortingMenu/SortingMenu';
import UserItem from '../../components/UserItem/UserItem';

import '../../styles/UsersPage.css';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [user, setUser] = useState<User>({ id: 0, name: '', username: '' });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [id, setId] = useState('0');

  const [filter, setFilter] = useState<Filter>({ query: '', sort: '' });
  const sortedAndSearched = useUsers(users, filter.query, filter.sort);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
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

  // useEffect(() => {
  //   setUsers(
  //     users.filter((user) => {
  //       return filter
  //         ? user.name.toLowerCase().includes(filter.query.toLowerCase()) ||
  //             user.username.toLowerCase().includes(filter.query.toLowerCase())
  //         : users;
  //     })
  //   );
  // }, [filter]);
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
            value={filter.query}
            onChange={handleQueryChange}
          />
        </form>
        <SortingMenu
          value={filter.sort}
          onChange={(selectedSort: string) =>
            setFilter({ ...filter, sort: selectedSort })
          }
          defaultValue="Sort By"
          options={[
            { value: 'name', name: 'By name' },
            { value: 'username', name: 'By username' },
            { value: 'id', name: 'Descending' },
          ]}
        />
      </div>
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
