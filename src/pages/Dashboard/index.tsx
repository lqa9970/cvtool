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
import useGetUser from "../../hooks/useGetUser";
import { formatDate } from "../../utils/date";

import "./index.scss";

function Dashboard() {
  const navigate = useNavigate();

  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email || "");

  if (!userDetails) { return null; }

  const lastUpdateOn = userDetails?.last_cv_update?.toDate() || null;
  const formattedDate = lastUpdateOn ? formatDate(lastUpdateOn) : null;

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
          <Grid>
            <GridRow>
              <Grid.Column width={6}>
                <Header as="h3">My CV</Header>
                <Segment placeholder textAlign="center">
                  {lastUpdateOn ? (
                    <>
                      <Header icon as="h4">
                        <Icon name="edit" onClick={() => navigate("/cv")} />
                        Edit CV
                      </Header>
                      <p>Last Update</p>
                      <p>{formattedDate}</p>
                    </>
                  ) : (
                    <Header icon as="h4">
                      <Icon
                        id="cvArea"
                        name="plus square outline"
                        onClick={() => navigate("/cv")}
                      />
                      Create a new CV.
                    </Header>
                  )}
                </Segment>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as="h3">Availability</Header>
                <Segment placeholder textAlign="center">
                  <Header icon as="h4">
                    Availability
                  </Header>
                </Segment>
              </Grid.Column>
            </GridRow>
          </Grid>
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
