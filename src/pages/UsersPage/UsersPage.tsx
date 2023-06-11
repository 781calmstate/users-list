import React, { useEffect, useState, useContext } from 'react';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { Tooltip } from '@mui/material';

import { MdOutlineRefresh } from 'react-icons/md';

import { Filter, User } from '../../types/model';

import { useUsers } from '../../hooks/useUsers';

import { UsersContext } from '../../context';

import AddModal from '../../components/AddModal/AddModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import EditModal from '../../components/EditModal/EditModal';

import UserFilter from '../../components/UserFilter/UserFilter';
import UserList from '../../components/UserList/UserList';

import '../../styles/UsersPage.css';
import '../../styles/transition.css';
import '../../styles/nav-buttons.css';
import ResetModal from '../../components/ResetModal/ResetModal';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useContext(UsersContext);

  const [newUser, setNewUser] = useState<User>({
    id: '0',
    name: 'Elizabeth Grande',
    username: 'Eliza',
  });
  const [currentUser, setCurrentUser] = useState<User>({
    id: '',
    name: '',
    username: '',
  });

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isReseting, setIsReseting] = useState<boolean>(false);
  const [id, setId] = useState('0');

  const [filter, setFilter] = useState<Filter>({ query: '', sort: '' });
  const sortedAndSearched = useUsers(users, filter.query, filter.sort);

  useEffect(() => {
    const dataFetch = async () => {
      const usersData = JSON.parse(localStorage.getItem('usersData') || '[]');

      if (usersData.length) {
        setUsers(usersData);
        return;
      }
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users'
      );
      const data = await response.json();
      setUsers(data);
      localStorage.setItem('usersData', JSON.stringify(data));
    };
    dataFetch();
  }, []);

  const addUser = (e: React.FormEvent, newUser: User) => {
    e.preventDefault();

    if (
      newUser.name.trim().length === 0 ||
      newUser.username.trim().length === 0
    ) {
      return;
    }

    const maxId = [...users].sort((p1, p2) => Number(p2.id) - Number(p1.id))[0]
      .id;
    const numberId = Number(maxId);

    if (newUser) {
      const newUsers = [
        ...users,
        {
          id: `${numberId + 1}`,
          name: newUser.name,
          username: newUser.username,
          email: 'Sincere@april.biz',
          phone: '1-770-736-8031 x56442',
          company: { name: 'Hoeger LLC' },
          address: { city: 'London' },
        },
      ];
      setUsers(newUsers);
      localStorage.setItem('usersData', JSON.stringify(newUsers));
    }
    setNewUser({ id: '0', name: 'Elizabeth Grande', username: 'Eliza' });

    setIsAdding(false);
  };

  const editUser = (e: React.FormEvent, currentUser: User, id: string) => {
    e.preventDefault();

    if (
      currentUser.name.trim().length === 0 ||
      currentUser.username.trim().length === 0
    ) {
      return;
    }

    const editedUser = users.map((user: User) =>
      Number(user.id) === Number(id)
        ? { ...user, name: currentUser.name, username: currentUser.username }
        : user
    );
    setUsers(editedUser);
    localStorage.setItem('usersData', JSON.stringify(editedUser));
    setIsEditing(false);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
  };

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setNewUser((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
    }));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === ' ') {
      return;
    }

    setCurrentUser((prev) => ({
      ...prev,
      [e.target.name]: typeof value === 'string' ? value : +value,
    }));
  };

  const handleResetClick = () => {
    setIsReseting(true);
  };

  const showAddModal = () => {
    setIsAdding(true);
  };

  return (
    <div className="userspage">
      <motion.button
        initial={{ opacity: 0, y: '-100%' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="addBtn"
        onClick={showAddModal}
      >
        Add User
      </motion.button>
      <UserFilter
        filter={filter}
        handleQueryChange={handleQueryChange}
        setFilter={setFilter}
      />
      <UserList
        setCurrentUser={setCurrentUser}
        setIsEditing={setIsEditing}
        sortedAndSearched={sortedAndSearched}
        setIsDeleting={setIsDeleting}
        setId={setId}
      />
      <Link to="/users-list">
        <button className="nav-button prevpage"></button>
      </Link>
      <Tooltip title="Reset changes in user list" placement="top">
        <button className="nav-button reset" onClick={handleResetClick}>
          <MdOutlineRefresh />
        </button>
      </Tooltip>

      {isAdding && (
        <AddModal
          addUser={addUser}
          newUser={newUser}
          setIsAdding={setIsAdding}
          handleAddChange={handleAddChange}
        />
      )}
      {isEditing && (
        <EditModal
          editUser={editUser}
          id={id}
          setIsEditing={setIsEditing}
          currentUser={currentUser}
          handleEditChange={handleEditChange}
        />
      )}
      {isDeleting && <DeleteModal id={id} setIsDeleting={setIsDeleting} />}
      {isReseting && <ResetModal setIsReseting={setIsReseting} />}
    </div>
  );
};

export default UsersPage;
