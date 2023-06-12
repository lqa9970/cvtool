import React from 'react';
import { Header } from 'semantic-ui-react';
import { Filters } from '../../types/types';
import SearchableSelect from '../Dropdown/SearchableSelect';

type FilterDropdownProps = {
  label: string;
  options: { text: string; value: string }[];
  filterKey: keyof Filters;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  filterKey,
  filters,
  setFilters
}) => (
  <Header as="h5">
    {label}
    <SearchableSelect
      multiSelected
      allOptions={options}
      value={filters[filterKey]}
      filter={(value) => setFilters({ ...filters, [filterKey]: value })}
      placeholder=""
    />
  </Header>
);

export default FilterDropdown;
