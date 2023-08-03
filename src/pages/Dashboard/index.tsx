import { Grid, GridColumn, Container, GridRow } from "semantic-ui-react";
import Availability from "../../components/Availability/Availability";
import Badges from "../../components/Badges/Badges";
import CreateEditCv from "../../components/CreateEditCv/CreateEditCv";
import LastActivities from "../../components/LastActivities/LastActivities";
import UserCard from "../../components/UserCard/UserCard";
import { useUserContext } from "../../context/UserContext";

import "./index.scss";

function Dashboard() {
  const { user } = useUserContext();

  if (!user) {
    return null;
  }

  return (
    <Container id="dashboard">
      <Grid>
        <Grid.Column width={4}>
          <UserCard name={user.name} email={user.email} />
        </Grid.Column>
        <GridColumn width={8}>
          <Grid>
            <GridRow>
              <Grid.Column width={6}>
                <CreateEditCv last_cv_update={user?.last_cv_update} />
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
