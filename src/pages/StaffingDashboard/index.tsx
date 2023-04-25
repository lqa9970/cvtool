import { Grid, GridColumn, Header, Container, Search } from 'semantic-ui-react';

import { useOktaAuth } from '@okta/okta-react';
import SearchableSelect from '../../components/Dropdown/SearchableSelect';
import UserCard from '../../components/UserCard/UserCard';

const data = [
  {
    name: 'Hella Kaari',
    email: 'Hella@nordcloud.com'
  },
  {
    name: 'Ninja 1',
    email: 'ninja1@nordcloud.com'
  },
  {
    name: 'Ninja 2',
    email: 'ninja2@nordcloud.com'
  },
  {
    name: 'Ninja 1',
    email: 'ninja1@nordcloud.com'
  },
  {
    name: 'Ninja 1',
    email: 'ninja1@nordcloud.com'
  },
  {
    name: 'Ninja 1',
    email: 'ninja1@nordcloud.com'
  }
];

const displayMatchCard = (
  <Grid divided="vertically">
    <Grid.Row columns={5}>
      <Grid.Column>
        <Header as="h4"> Key word search</Header>
        <Search placeholder="search..." />
      </Grid.Column>
    </Grid.Row>
    <Header as="h3">Result: { Object.keys(data).length}</Header>
    <Grid.Row columns={3}>
      {data.map((p) => (
        <GridColumn>
          <UserCard name={p.name} email={p.email} />
        </GridColumn>
      ))}
    </Grid.Row>
  </Grid>
);

const filterSection = (
  <Grid>
    <Grid.Column>
      <Header as="h5">
        Hyperscaler
        <SearchableSelect
          allOptions={[]}
          multiSelected={true}
          filter={() => console.log('option')}
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
          allOptions={[]}
          multiSelected={true}
          filter={() => console.log('option')}
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
    </Grid.Column>
  </Grid>
);

const StaffingDashboard = () => {
  const { authState } = useOktaAuth();
  return (
    <>
      {authState ? (
        <Container className="dashboard">
          <Grid stackable divided doubling columns={2}>
            <Grid.Column width={4}>{filterSection}</Grid.Column>
            <Grid.Column width={12}> {displayMatchCard}</Grid.Column>
          </Grid>
        </Container>
      ) : (
        <>
          <p>null</p>
        </>
      )}
    </>
  );
};

export default StaffingDashboard;
