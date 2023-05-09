import { Grid, GridColumn, Header, Container } from 'semantic-ui-react';
import { Segment, GridRow, Icon, Button } from 'semantic-ui-react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import SearchableSelect from '../../components/Dropdown/SearchableSelect';

import './index.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  const { authState } = useOktaAuth();

  return (
    <Container className="dashboard">
      <Grid>
        <Grid.Column width={4}>
          <UserCard
            name={authState?.idToken?.claims.name}
            email={authState?.idToken?.claims.email}
          />
        </Grid.Column>
        <GridColumn width={8}>
          <GridRow>
            <Header as="h3">My CV</Header>
            <Segment placeholder textAlign="center">
              <Header as="h4" icon>
                <Icon
                  id="cvArea"
                  name="plus square outline"
                  onClick={() => navigate('/cv')}
                />
                Create a new CV.
              </Header>
              <Button onClick={() => navigate('/staffing')} />
            </Segment>
            {/* <Header as="h3">Badges</Header>
            <Segment placeholder textAlign="center">
              <Header as="h4" icon>
                <Icon
                  id="cvArea"
                  name="plus square outline"
                  onClick={() => navigate('/cvprofile')
                }
                />
                You haven't attach any badges.
              </Header>
            </Segment> */}
          </GridRow>
        </GridColumn>
        <GridColumn width={4}>
          <Header as="h4">Last Activites</Header>
          <Segment id="actLogs">
            <p>
              Login to Okta <span>03.04.2023 </span>
            </p>
          </Segment>
        </GridColumn>
      </Grid>

      {/* Temporal place for Search page. Will be moved later */}

      <div className="search">
        <div className="search_section">
          <SearchableSelect
            allOptions={[
              { text: 'ABC', value: '123' },
              { text: 'DEF', value: '123' },
              { text: 'GHI', value: '123' },
              { text: 'MNP', value: '123' },
              { text: 'XYZ', value: '123' }
            ]}
            filter={(value)=>console.log('selected value', value)}
            placeholder="Search here..."

          />
        </div>
      </div>

      {/* Temporal place for Search result cards. Will be moved later */}
    </Container>
  );
};
export default Dashboard;
