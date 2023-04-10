import {
  Grid,
  GridColumn,
  Header,
  Container,
  Segment,
  GridRow,
  Icon,
} from "semantic-ui-react";
import UserCard from "../../components/UserCard";

import "./index.css";

const Dashboard = () => {
  return (
    <Container className="dashboard">
      <Grid>
        <Grid.Column width={4}>
          <UserCard />
        </Grid.Column>
        <GridColumn width={8}>
          <GridRow>
            <Header as="h3">My CV</Header>
            <Segment placeholder textAlign="center">
              <Header as="h4" icon>
                <Icon
                  id="cvArea"
                  name="plus square outline"
                  onClick={() => alert("hello")}
                />
                You don't have a CV.
              </Header>
            </Segment>
            <Header as="h3">Badges</Header>
            <Segment placeholder textAlign="center">
              <Header as="h4" icon>
                <Icon
                  id="cvArea"
                  name="plus square outline"
                  onClick={() => alert("hello")}
                />
                You haven't attach any badges.
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
};
export default Dashboard;
