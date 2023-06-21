import { useMemo } from 'react';
import { User } from '../types/model';

export const useSortedUsers = (users: User[], sort: string) => {
  const sortedUsers = useMemo(() => {
    if (sort && (sort === 'name' || sort === 'username')) {
      return [...users].sort((a, b) => a[sort].localeCompare(b[sort]));
    } else if (sort === 'id') {
      return [...users].sort((a, b) => Number(b.id) - Number(a.id));
    } else {
      return users;
    }
  }, [sort, users]);
  return sortedUsers;
};

export const useUsers = (users: User[], query: string, sort: string) => {
  const sortedUsers = useSortedUsers(users, sort);

  const sortedAndSearched = useMemo(() => {
    return sortedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.username.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, sortedUsers, sort]);
  return sortedAndSearched;
};
