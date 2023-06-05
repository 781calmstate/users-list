import React from 'react';

import { BiFilterAlt } from 'react-icons/bi';

import { Option } from '../../types/model';

type Props = {
  value: string;
  onChange: (selectedSort: string) => void;
  defaultValue: string;
  options: Option[];
};

const SortingMenu: React.FC<Props> = ({
  value,
  onChange,
  defaultValue,
  options,
}) => {
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
      <span className="sorter__icon">
        <BiFilterAlt />
      </span>
    </div>
  );
};

export default SortingMenu;
