import React, { useState } from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import { useFormik } from 'formik';
import CustomReset from './CustomReset';
import FilterDropdown from './FilterDropdown';
import { EmployeeUser } from '../../types/types';
import './FilterDropdowns.scss';

import useGetFirestoreCollection from '../../hooks/useGetCollectionData';

type Filters = {
  hyperscaler: string[];
  mainTech: string[];
  skills: string[];
  certificate: string[];
  location: string[];
  languages: string[];
  nationality: string[];
};

// When you know the serach results type update the type never[] and 
type SetFilterSearchResultsType = React.Dispatch<React.SetStateAction<EmployeeUser[]>>;

const initialFilters: Filters = {
  hyperscaler: [],
  mainTech: [],
  skills: [],
  certificate: [],
  location: [],
  languages: [],
  nationality: []
};

const FilterDropdowns = ({ setFilterSearchResults }: { setFilterSearchResults: SetFilterSearchResultsType }) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const fetchFieldData = <T extends { name: string }>(
    collection: string,
    mapper: (item: T) => string
  ): { text: string; value: string }[] => {
    const { data } = useGetFirestoreCollection({ collection });

    return data.map((n) => {
      return { key: mapper(n), text: mapper(n), value: mapper(n) };
    });
  };

  const hyperscalerData = fetchFieldData<{ name: string }>(
    'hyperscaler',
    (n) => n.name
  );
  const mainTechData = fetchFieldData<{ name: string }>(
    'main_tech',
    (n) => n.name
  );
  console.log('maintechData', mainTechData);
  const skillsData = fetchFieldData<{ name: string }>('skills', (n) => n.name);
  const certificationData = fetchFieldData<{ name: string }>(
    'certification',
    (n) => n.name
  );
  const locationData = fetchFieldData<{ name: string; city: string }>(
    'location',
    (n) => n.city
  );
  const languagesData = fetchFieldData<{ name: string; prefix: string }>(
    'languages',
    (n) => n.prefix
  );
  const nationalityData = fetchFieldData<{ name: string; code: string }>(
    'countries',
    (n) => n.code
  );

  const formik = useFormik({
    onSubmit: (values, actions) => {
      // Fetch search results using a hook

      actions.resetForm();
      actions.setSubmitting(false);
    },
    initialValues: { filters }
  });

  const handleFormReset = () => {
    setFilters(initialFilters);
    formik.resetForm();
  };
  return (
    <form>
      <Container>
        <div className="header-wrapper">
          <Header as="h4">Filter</Header>
          <CustomReset label="Clear Selection" onClick={handleFormReset} />
        </div>
        <Divider />
        <FilterDropdown
          label="Hyperscaler"
          options={hyperscalerData}
          filterKey="hyperscaler"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          label="Main tech"
          options={mainTechData}
          filterKey="mainTech"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          label="Skills"
          options={skillsData}
          filterKey="skills"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          label="Certificates"
          options={certificationData}
          filterKey="certificate"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          label="Location"
          options={locationData}
          filterKey="location"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          label="Languages"
          options={languagesData}
          filterKey="languages"
          filters={filters}
          setFilters={setFilters}
        />
        <FilterDropdown
          label="Nationality"
          options={nationalityData}
          filterKey="nationality"
          filters={filters}
          setFilters={setFilters}
        />
      </Container>
    </form>
  );
};

export default FilterDropdowns;
