import React from 'react';

import { BiFilterAlt } from 'react-icons/bi';

import { Tooltip } from '@mui/material';

import { useAppDispatch } from '../../hooks';

import * as usersActions from '../../redux/store/slices/usersSlice';

import { IFilter, IOption } from '../../types/model';

import './style.css';

type TSortingMenuProps = {
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
  value: string;
  onChange: (selectedSort: string) => void;
  defaultValue: string;
  options: IOption[];
};

export const SortingMenu = ({
  setFilter,
  value,
  onChange,
  defaultValue,
  options,
}: TSortingMenuProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleResetClick = () => {
    setFilter({ query: '', sort: '' });
    dispatch(usersActions.resetFilters());
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
          <option key={option.value} value={option.value}>
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
