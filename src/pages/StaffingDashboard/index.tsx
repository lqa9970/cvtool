import {
  Container,
  Divider,
  Grid,
  GridColumn,
  Header,
  Search
} from 'semantic-ui-react';

import { useOktaAuth } from '@okta/okta-react';
import SearchableSelect from '../../components/Dropdown/SearchableSelect';
import EmployeeProfileCard from '../../components/EmployeeCard/EmployeeProfileCard';

import './index.scss';
import { Value } from 'sass';

const employeeData = [
  {
    name: 'Satu Aurinko',
    job_title: 'Senior Developer',
    location: 'Turku, Finland',
    nationality: 'Finnish',
    manager_name: 'Auiki kala',
    manager_email: 'Auiki@nordcloud.com',
    phone_number: '358 415163',
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Java' },
      { id: '3', name: 'Typescript' }
    ]
  },
  {
    name: 'Satu Aurinko',
    job_title: 'Junior Developer',
    location: 'Turku, Finland',
    nationality: 'Finnish',
    manager_name: 'Auiki kala',
    manager_email: 'Auiki@nordcloud.com',
    phone_number: '358 415163',
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Java' },
      { id: '3', name: 'Typescript' }
    ]
  },
  {
    name: 'Satu Aurinko',
    job_title: 'Senior Developer',
    location: 'Turku, Finland',
    nationality: 'Finnish',
    manager_name: 'Auiki kala',
    manager_email: 'Auiki@nordcloud.com',
    phone_number: '358 415163',
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Java' },
      { id: '3', name: 'Typescript' }
    ]
  },
  {
    name: 'Satu Aurinko',
    job_title: 'Senior Developer',
    location: 'Turku, Finland',
    nationality: 'Finnish',
    manager_name: 'Auiki kala',
    manager_email: 'Auiki@nordcloud.com',
    phone_number: '358 415163',
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Java' },
      { id: '3', name: 'Typescript' }
    ]

  }
]

const DisplayMatchCard = (
  <Grid divided="vertically" id="display">
    <Grid.Row columns={5}>
      <Grid.Column>
        <Header as="h4"> Key word search</Header>
        <Search placeholder="search..." />
      </Grid.Column>
    </Grid.Row>
    <Header as="h3">Result: {Object.keys(employeeData).length}</Header>
    <Grid.Row columns={3}>
      {employeeData.map((employee) => (
        <GridColumn>
          <EmployeeProfileCard employee={employee} />
        </GridColumn>
      ))}
    </Grid.Row>
  </Grid>
);

const FilterSection = (
  <Container>
    <Header as='h4'>Filter</Header>
    <Divider/>
    <Header as="h5">
      Hyperscaler
      <SearchableSelect
        allOptions={[]}
        multiSelected={true}
        filter={() => console.log()}
        placeholder=""
      />
    </Header>
    <Header as="h5">
      Main tech
      <SearchableSelect
        allOptions={[]}
        multiSelected={true}
        filter={() => console.log('option')}
        placeholder=""
      />
    </Header>
    <Header as="h5">
      Skills
      <SearchableSelect
        allOptions={[]}
        multiSelected={true}
        filter={() => console.log('option')}
        placeholder=""
      />
    </Header>
    <Header as="h5">
      Certificates
      <SearchableSelect
        allOptions={[]}
        multiSelected={true}
        filter={() => console.log('option')}
        placeholder=""
      />
    </Header>
    <Header as="h5">
      Location
      <SearchableSelect
        allOptions={[]}
        multiSelected={true}
        filter={() => console.log('option')}
        placeholder=""
      />
    </Header>
    <Header as="h5">
      Languages
      <SearchableSelect
        allOptions={[ { text: 'French', value: 'french' },
        { text: 'German', value: 'German' }]}
        multiSelected={true}
        filter={(value) => console.log(value)}
        placeholder=""
      />
    </Header>
    <Header as="h5">
      Nationality
      <SearchableSelect
        allOptions={[]}
        multiSelected={true}
        filter={() => console.log('option')}
        placeholder=""
      />
    </Header>
  </Container>
);

const StaffingDashboard = () => {
  const { authState } = useOktaAuth();
  return (
    <>
      {authState ? (
        <div id="grid-box">
          <Grid stackable divided doubling columns={2}>
            <Grid.Column width={4}>{FilterSection}</Grid.Column>
            <Grid.Column width={12}> {DisplayMatchCard}</Grid.Column>
          </Grid>
        </div>
      ) : (
        <>
          <p>null</p>
        </>
      )}
    </>
  );
};

export default StaffingDashboard;
