import { useState } from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import SearchableSelect from '../Dropdown/SearchableSelect';

type Filters = {
  hyperscaler: string[];
  mainTech: string[];
  skills: string[];
  certificate: string[];
  location: string[];
  languages: string[];
  nationality: string[];
};

const allOptions = {
  hyperscaler: [
    { text: 'AWS', value: 'aws' },
    { text: 'Azure', value: 'azure' },
    { text: 'Google Cloud', value: 'gcp' }
  ],
  mainTech: [
    { text: 'React', value: 'react' },
    { text: 'Vue', value: 'vue' },
    { text: 'Angular', value: 'angular' }
  ],
  skills: [
    { text: 'Frontend Development', value: 'frontend' },
    { text: 'Backend Development', value: 'backend' },
    { text: 'Full Stack Development', value: 'fullstack' }
  ],
  certificate: [
    { text: 'AWS Certified Solutions Architect', value: 'aws-architect' },
    {
      text: 'Google Certified Professional Cloud Architect',
      value: 'gcp-architect'
    },
    {
      text: 'Microsoft Certified: Azure Solutions Architect Expert',
      value: 'azure-architect'
    }
  ],
  location: [
    { text: 'Helsinki', value: 'helsinki' },
    { text: 'New York', value: 'new-york' },
    { text: 'London', value: 'london' }
  ],
  languages: [
    { text: 'Finnish', value: 'finnish' },
    { text: 'English', value: 'english' },
    { text: 'French', value: 'french' }
  ],
  nationality: [
    { text: 'Finland', value: 'finland' },
    { text: 'USA', value: 'usa' },
    { text: 'France', value: 'french' }

  ]
};

const FilterDropdowns = () => {
  const [filters, setFilters] = useState<Filters>({
    hyperscaler: [],
    mainTech: [],
    skills: [],
    certificate: [],
    location: [],
    languages: [],
    nationality: []
  });

  console.log('Selected filters', filters);
  return (
    <>
      <Container>
        <Header as="h4">Filter</Header>
        <Divider />
        <Header as="h5">
          Hyperscaler
          <SearchableSelect
            allOptions={allOptions.hyperscaler}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, hyperscaler: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Main tech
          <SearchableSelect
            allOptions={allOptions.mainTech}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, mainTech: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Skills
          <SearchableSelect
            allOptions={allOptions.skills}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, skills: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Certificates
          <SearchableSelect
            allOptions={allOptions.certificate}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, certificate: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Location
          <SearchableSelect
            allOptions={allOptions.location}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, location: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Languages
          <SearchableSelect
            allOptions={allOptions.languages}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, languages: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Nationality
          <SearchableSelect
            allOptions={allOptions.nationality}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, nationality: value })}
            placeholder=""
          />
        </Header>
      </Container>
    </>
  );
};

export default FilterDropdowns;
