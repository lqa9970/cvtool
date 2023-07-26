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
                  <Grid.Column computer={8} mobile={16} textAlign="left">
                    <p>{object.message}</p>
                  </Grid.Column>
                  <Grid.Column computer={8} mobile={16} textAlign="center">
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
