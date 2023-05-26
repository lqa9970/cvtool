import { Grid, GridColumn, Header, Search } from 'semantic-ui-react';

import { useOktaAuth } from '@okta/okta-react';
import EmployeeProfileCard from '../../components/EmployeeCard/EmployeeProfileCard';
import FilterDropdowns from '../../components/FilterDropdowns/FilterDropdowns';

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
    roles: [{ id: '1', name: 'staff' }],
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
    roles: [{ id: '1', name: 'staff' }],
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
    roles: [{ id: '1', name: 'staff' }],
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
    roles: [{ id: '1', name: 'staff' }],
    skills: [
      { id: '1', name: 'React' },
      { id: '2', name: 'Java' },
      { id: '3', name: 'Typescript' }
    ]
  }
];

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
      {employeeData.map((employee, index) => (
        <div key={index}>
          <GridColumn>
            <EmployeeProfileCard employee={employee} />
          </GridColumn>
        </div>
      ))}
    </Grid.Row>
  </Grid>
);

const StaffingDashboard = () => {
  const { authState } = useOktaAuth();
  return (
    <>
      {authState ? (
        <div id="grid-box">
          <Grid stackable divided doubling columns={2}>
            <Grid.Column width={4}>
              <FilterDropdowns />
            </Grid.Column>
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
