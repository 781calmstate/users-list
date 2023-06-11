import React from 'react';

import { motion } from 'framer-motion';

import { Filter } from '../../types/model';

import SortingMenu from '../SortingMenu/SortingMenu';

type Props = {
  filter: Filter;
  handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const UserFilter: React.FC<Props> = ({
  filter,
  handleQueryChange,
  setFilter,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="searchAndSort"
    >
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
    </motion.div>
  );
};

export default UserFilter;
