import React from 'react';

import SortingMenu from '../SortingMenu/SortingMenu';
import { Filter, User } from '../../types/model';

type Props = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  filter: Filter;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const UserFilter: React.FC<Props> = ({
  users,
  setUsers,
  filter,
  handleQueryChange,
  setFilter,
}) => {
  return (
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
        users={users}
        setUsers={setUsers}
        setFilter={setFilter}
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
  );
};

export default UserFilter;
