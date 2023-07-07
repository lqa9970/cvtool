import UserCard from "../../components/UserCard/UserCard";
import { useOktaAuth } from "@okta/okta-react";
import {
  Container,
  Grid,
  Segment,
  Header,
  Accordion,
  Icon,
  Button,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./admin.scss";

const StaffDashboard = () => {
  const { authState } = useOktaAuth();

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
                <Button id="staff-button">Delete CV</Button>
              </Link>
            </div>
          </>
        ),
      },
    },
    {
      key: "management",
      title: "Management",
      content: {
        content: (
          <>
            <Link to="/search">
              <Button id="staff-button">Search Employee</Button>
            </Link>
            <Link to="/search">
              <Button id="staff-button">Search Employee</Button>
            </Link>
          </>
        ),
      },
    },
    {
      key: "access-control",
      title: "Access Control",
      content: {
        content: (
          <>
            <Link to="/search">
              <Button id="staff-button">Permissions</Button>
            </Link>
          </>
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
              name={authState?.idToken?.claims.name}
              email={authState?.idToken?.claims.email}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <Accordion
              defaultActiveIndex={[0, 1, 2]}
              panels={panels}
              exclusive={false}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
};

export default StaffDashboard;
