import { useState, useEffect, Dispatch, SetStateAction } from 'react';

import useFilter from '../../hooks/useFilter';
import { EmployeeUser, Filters } from '../../types/types';
import FilterDropdowns from '../../components/FilterDropdowns/FilterDropdowns';

const initialFilters: Filters = {
  hyperscaler: [],
  mainTech: [],
  skills: [],
  certificate: [],
  location: [],
  languages: [],
  nationality: []
};

type EmployeeFilterProps = {
  setLastUpdated: Dispatch<SetStateAction<string>>;
  setFilterResults: Dispatch<SetStateAction<EmployeeUser[]>>;
};

const EmployeeFilter = ({
  setLastUpdated,
  setFilterResults
}: EmployeeFilterProps) => {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const results = useFilter(filters);
  setFilterResults(results); // Empty array when search doesn't match
  useEffect(() => {
    if (filters !== initialFilters) {
      setLastUpdated('filter');
    }
  }, [filters]);

  return <FilterDropdowns filters= {filters} setFilters={setFilters} />;
};

export default EmployeeFilter;
