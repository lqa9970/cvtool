import { Grid, GridColumn, Header, Search } from 'semantic-ui-react';

import { useOktaAuth } from '@okta/okta-react';
import EmployeeProfileCard from '../../components/EmployeeCard/EmployeeProfileCard';
import FilterDropdowns from '../../components/FilterDropdowns/FilterDropdowns';
import useKeywordSearch from '../../hooks/useKeywordSearch';

import './index.scss';
import { useState } from 'react';

const StaffingDashboard = () => {
  const { authState } = useOktaAuth();

  const [keyword, setKeyword] = useState('');
  const searchResults = useKeywordSearch(keyword);

  const DisplayMatchCard = (
    <Grid divided="vertically" id="display">
      <Grid.Row columns={5}>
        <Grid.Column>
          <Header as="h4"> Key word search</Header>
          <Search
            onSearchChange={(e, data) => {
              if (data.value !== undefined) {
                setKeyword(data.value);
              }
            }}
            results={searchResults}
            value={keyword}
            placeholder="search..."
          />
        </Grid.Column>
      </Grid.Row>
      <Header as="h3">Result: {Object.keys(searchResults).length}</Header>
      <Grid.Row columns={3}>
        {searchResults.map((employee: any) => (
          <GridColumn>
            <EmployeeProfileCard employee={employee} />
          </GridColumn>
        ))}
      </Grid.Row>
    </Grid>
  );

  return (
    <>
      {authState ? (
        <div id="grid-box">
          <Grid stackable divided doubling columns={2}>
            <Grid.Column width={4}>
              <FilterDropdowns />
            </Grid.Column>
            <Grid.Column width={12}>{DisplayMatchCard}</Grid.Column>
          </Grid>
        </div>
      ) : (
        <p>null</p>
      )}
    </>
  );
};

export default StaffingDashboard;
