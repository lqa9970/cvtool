import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  GridColumn,
  Header,
  Container,
  Segment,
  GridRow,
  Icon,
} from "semantic-ui-react";
import UserCard from "../../components/UserCard/UserCard";

import "./index.scss";

function Dashboard() {
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
              <Header icon as="h4">
                <Icon
                  id="cvArea"
                  name="plus square outline"
                  onClick={() => navigate("/cv")}
                />
                Create a new CV.
              </Header>
            </Segment>
            <Header as="h3">Badges</Header>
            <Segment placeholder textAlign="center">
              <Header icon as="h4">
                <Icon
                  id="cvArea"
                  name="plus square outline"
                  onClick={() => navigate("/cv")}
                />
                You haven&apos;t attach unknown badges.
              </Header>
            </Segment>
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
    </Container>
  );
}
export default Dashboard;
