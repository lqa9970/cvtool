import { Link } from "react-router-dom";
import { Container, Grid, Accordion, Button } from "semantic-ui-react";
import UserCard from "../../components/UserCard/UserCard";
import { useUserContext } from "../../context/UserContext";

import "./staff.scss";

function StaffDashboard() {
  const { user } = useUserContext()

  const panels = [
    {
      key: "cv",
      title: "CV",
      content: {
        content: (
          <>
            <div id="staff-cv">
              <Link to="/cv">
                <Button id="staff-button">Modify CV</Button>
              </Link>
              <Link to="/">
                <Button id="staff-button">Create CV</Button>
              </Link>
            </div>
          </>
        ),
      },
    },
    {
      key: "search",
      title: "Search",
      content: {
        content: (
          <Link to="/search">
            <Button id="staff-button">Search Employee</Button>
          </Link>
        ),
      },
    },
  ];

  return (
    <>
      <Container className="dashboard">
        <Grid>
          <Grid.Column width={4}>
            <UserCard
              name={user?.name}
              email={user?.email}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <Accordion
              defaultActiveIndex={[0, 1]}
              panels={panels}
              exclusive={false}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default StaffDashboard;
