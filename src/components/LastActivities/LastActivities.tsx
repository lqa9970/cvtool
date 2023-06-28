import { useContext } from "react";
import { Header, Segment, Grid } from "semantic-ui-react";
import { ActivityContext } from "../../context/ActivityContext";
import { formatDate, activitySortFunction } from "../../utils/date";
import { uniqueIdGenerator } from "../../utils/uid";

function LastActivities() {
  const { activities } = useContext(ActivityContext);

  const sortedActivities = activities?.sort(activitySortFunction);

  return (
    <>
      <Header as="h4">Last Activites</Header>
      <Segment>
        {sortedActivities.length > 0
          ? sortedActivities?.map((object) => (
              <Grid key={uniqueIdGenerator()} columns={2}>
                <Grid.Row>
                  <Grid.Column width={10}>
                    <p>{object.message}</p>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    <span>{formatDate(object?.date.toDate())}</span>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            ))
          : "No activities yet"}
      </Segment>
    </>
  );
}

export default LastActivities;
