import {
  Grid,
  GridColumn,
  Header,
  Container,
  Segment,
  GridRow,
  Icon
} from 'semantic-ui-react';
import { useOktaAuth } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import UserCard from '../../components/UserCard/UserCard';
import SearchableSelect from '../../components/search/SearchableSelect';
import SearchResultCard from '../../components/SearchResultCard/SearchResultCard';

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
                  onClick={() => navigate('/staffing')}
                />
                Create a new CV.
              </Header>
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
            placeholder="Search here..."
            options={[
              { text: 'ABC', value: '123' },
              { text: 'DEF', value: '123' },
              { text: 'GHI', value: '123' },
              { text: 'MNP', value: '123' },
              { text: 'XYZ', value: '123' }
            ]}
          />
        </div>
        <div className="search_result">
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
          <SearchResultCard />
        </div>
      </div>

      {/* Temporal place for Search result cards. Will be moved later */}
    </Container>
  );
};
export default Dashboard;
