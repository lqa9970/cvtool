import { useState, useEffect } from 'react';

import useFilter from '../../hooks/useFilter';
import { EmployeeUser, Filters } from '../../types/types';
import FilterDropdowns from "../FilterDropdowns/FilterDropdowns";

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
  setLastUpdated: React.Dispatch<React.SetStateAction<string>>;
  setFilterResults: React.Dispatch<React.SetStateAction<EmployeeUser[]>>;
};

function EmployeeFilter({
  setLastUpdated,
  setFilterResults
}: EmployeeFilterProps) {
  const [filters, setFilters] = useState<Filters>(initialFilters)
  const results = useFilter(filters);
  setFilterResults(results); // Empty array when search doesn't match
  useEffect(() => {
    if (filters !== initialFilters) {
      setLastUpdated('filter');
    }
  }, [filters]);

  return <FilterDropdowns filters= {filters} setFilters={setFilters} />;
}

export default EmployeeFilter;
