import React, { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { useUsers } from '../../hooks';

import * as usersActions from '../../redux/store/slices/usersSlice';

import {
  AddModal,
  DeleteModal,
  EditModal,
  UserFilter,
  UserList,
} from '../../components';

import { IFilter, IUser } from '../../types/model';

import './style.css';
import '../../styles/nav-buttons.css';
import '../../styles/transition.css';
import '../../styles/modal.css';

const INITIAL_USER = {
  id: '',
  name: '',
  username: '',
  email: '',
  phone: '',
  company: { name: '' },
  address: { city: '' },
};

export const UsersPage = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [currentUser, setCurrentUser] = useState<IUser>(INITIAL_USER);

  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [id, setId] = useState('0');
  const [filter, setFilter] = useState<IFilter>({ query: '', sort: '' });
  const sortedAndSearched = useUsers(users, filter.query, filter.sort);

  useEffect(() => {
    dispatch(usersActions.getUsers());
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, query: e.target.value });
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

      {isAdding && <AddModal setIsAdding={setIsAdding} />}
      {isEditing && (
        <EditModal
          id={id}
          setIsEditing={setIsEditing}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      )}
      {isDeleting && <DeleteModal id={id} setIsDeleting={setIsDeleting} />}
    </div>
  );
};
