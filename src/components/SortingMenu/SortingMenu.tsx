import React, { useContext } from 'react';

import { BiFilterAlt } from 'react-icons/bi';

import { Tooltip } from '@mui/material';

import { UsersContext } from '../../context';

import { Filter, Option, User } from '../../types/model';

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  value: string;
  onChange: (selectedSort: string) => void;
  defaultValue: string;
  options: Option[];
};

const SortingMenu: React.FC<Props> = ({
  setFilter,
  value,
  onChange,
  defaultValue,
  options,
}) => {
  const [users, setUsers] = useContext(UsersContext);

  const handleResetClick = () => {
    setFilter({ query: '', sort: '' });
    setUsers(users.sort((a: User, b: User) => Number(a.id) - Number(b.id)));
  };

  return (
    <div className="sortingMenu">
      <select
        className="sorter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="" disabled hidden>
          {defaultValue}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="sorter__option"
          >
            {option.name}
          </option>
        ))}
      </select>
      <Tooltip title="Reset Filters" placement="top">
        <button className="sorter__btn" onClick={handleResetClick}>
          <BiFilterAlt />
        </button>
      </Tooltip>
    </div>
  );
};

export default SortingMenu;
