import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { Filter, User } from '../../types/model';

import { useUsers } from '../../hooks/useUsers';

import AddModal from '../../components/AddModal/AddModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import EditModal from '../../components/EditModal/EditModal';

import UserFilter from '../../components/UserFilter/UserFilter';
import UserList from '../../components/UserList/UserList';
import '../../styles/UsersPage.css';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const [user, setUser] = useState<User>({ id: 0, name: '', username: '' });
  const [newUser, setNewUser] = useState<User>({
    id: '0',
    name: 'Elizabeth Grande',
    username: 'Eliza',
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [id, setId] = useState('0');

  const [filter, setFilter] = useState<Filter>({ query: '', sort: '' });
  const sortedAndSearched = useUsers(users, filter.query, filter.sort);

  useEffect(() => {
    const dataFetch = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
    };
    dataFetch();
  }, [filter]);

  const addUser = (e: React.FormEvent, newUser: User) => {
    e.preventDefault();

    const maxId = [...users].sort((p1, p2) => Number(p2.id) - Number(p1.id))[0]
      .id;

    if (newUser) {
      setUsers([
        ...users,
        { id: `${maxId + 1}`, name: newUser.name, username: newUser.username },
      ]);
    }
    setNewUser({ id: '0', name: 'Elizabeth Grande', username: 'Eliza' });
    setIsAdding(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const handleModalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === ' ') {
      return;
    }

    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
    }));
  };

  const showAddModal = () => {
    setIsAdding(true);
  };

  return (
    <div className="userspage">
      <button className="addBtn" onClick={showAddModal}>
        Add User
      </button>
      <UserFilter
        filter={filter}
        handleQueryChange={handleQueryChange}
        setFilter={setFilter}
      />
      <UserList
        sortedAndSearched={sortedAndSearched}
        setIsDeleting={setIsDeleting}
        setId={setId}
      />
      <Link to="/users-list">
        <button className="nav-button prevpage"></button>
      </Link>
      {isAdding && (
        <AddModal
          addUser={addUser}
          newUser={newUser}
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
