import { useMemo } from 'react';
import { IUser } from '../types/model';

export const useSortedUsers = (users: IUser[], sort: string) => {
  const sortedUsers = useMemo(() => {
    const compareFn = (a: IUser, b: IUser) => {
      if (sort === 'name' || sort === 'username') {
        return a[sort].localeCompare(b[sort]);
      } else if (sort === 'id') {
        return Number(b.id) - Number(a.id);
      }
      return 0;
    };

    return sort ? [...users].sort(compareFn) : users;
  }, [sort, users]);

  return sortedUsers;
};

export const useUsers = (users: IUser[], query: string, sort: string) => {
  const sortedUsers = useSortedUsers(users, sort);

  const sortedAndSearched = useMemo(() => {
    const lowercasedQuery = query.toLocaleLowerCase();

    return sortedUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(lowercasedQuery) ||
        user.username.toLowerCase().includes(lowercasedQuery)
    );
  }, [query, sortedUsers]);
  return sortedAndSearched;
};
