import { useState } from 'react';
import { Container, Divider, Header } from 'semantic-ui-react';
import SearchableSelect from '../Dropdown/SearchableSelect';

import useGetFirestoreCollection from '../../hooks/useGetCollectionData'

type Filters = {
  hyperscaler: string[];
  mainTech: string[];
  skills: string[];
  certificate: string[];
  location: string[];
  languages: string[];
  nationality: string[];
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

  const hyperscaler = useGetFirestoreCollection({ collection: 'hyperscaler' });
  const hyperscalerData = hyperscaler.data.map((n) => {
    return { text: n.name, value: n.name };
  });

  const mainTech = useGetFirestoreCollection({ collection: 'main_tech' });
  const mainTechData = mainTech.data.map((n) => {
    return { text: n.name, value: n.name };
  });

  const skills = useGetFirestoreCollection({ collection: 'skills' });
  const skillsData = skills.data.map((n) => {
    return { text: n.name, value: n.name };
  });

  const certifications = useGetFirestoreCollection({ collection: 'certification' });
  const certificationData = certifications.data.map((n) => {
    return { text: n.name, value: n.name };
  });

  const locations = useGetFirestoreCollection({ collection: 'location' });
  const locationData = locations.data.map((n) => {
    return { text: n.city, value: n.city };
  });
 
  const languages = useGetFirestoreCollection({ collection: 'languages' });
  const languagesData = languages.data.map((n) => {
    return { text: n.name, value: n.prefix };
  });

  const nationality = useGetFirestoreCollection({
    collection: 'countries'
  });
  const nationalityData = nationality.data.map((n) => {
    return { text: n.name, value: n.code };
  });
  return (
    <>
      <Container>
        <Header as="h4">Filter</Header>
        <Divider />
        <Header as="h5">
          Hyperscaler
          <SearchableSelect
            allOptions={hyperscalerData}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, hyperscaler: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Main tech
          <SearchableSelect
            allOptions={mainTechData}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, mainTech: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Skills
          <SearchableSelect
            allOptions={skillsData}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, skills: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Certificates
          <SearchableSelect
            allOptions={certificationData}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, certificate: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Location
          <SearchableSelect
            allOptions={locationData}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, location: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Languages
          <SearchableSelect
            allOptions={languagesData}
            multiSelected={true}
            filter={(value) => setFilters({ ...filters, languages: value })}
            placeholder=""
          />
        </Header>
        <Header as="h5">
          Nationality
          <SearchableSelect
            allOptions={nationalityData}
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
