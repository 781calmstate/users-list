import React from 'react';

import { BiFilterAlt } from 'react-icons/bi';

import { Tooltip } from '@mui/material';

import { Filter, Option } from '../../types/model';

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
  const handleResetClick = () => setFilter({ query: '', sort: '' });

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
