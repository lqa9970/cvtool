import { useOktaAuth } from "@okta/okta-react";
import { Grid, GridColumn, Container, GridRow } from "semantic-ui-react";
import Availability from "../../components/Availability/Availability";
import Badges from "../../components/Badges/Badges";
import CreateEditCv from "../../components/CreateEditCv/CreateEditCv";
import LastActivities from "../../components/LastActivities/LastActivities";
import UserCard from "../../components/UserCard/UserCard";
import useGetUser from "../../hooks/useGetUser";

import "./index.scss";

function Dashboard() {

  const { authState } = useOktaAuth();
  const [userDetails] = useGetUser(authState?.idToken?.claims.email || "");

  if (!userDetails) { return null }

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
                <CreateEditCv last_cv_update={userDetails?.last_cv_update} />
              </Grid.Column>
              <Grid.Column width={10}>
                <Availability />
              </Grid.Column>
            </GridRow>
          </Grid>
          <Badges />
        </GridColumn>
        <GridColumn width={4}>
          <LastActivities />
        </GridColumn>
      </Grid>
    </Container>
  );
}
export default Dashboard;
