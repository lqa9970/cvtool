import { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Accordion,
  Button,
  Dropdown,
} from "semantic-ui-react";

import "./admin.scss";
import UserCard from "../../components/UserCard/UserCard";
import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import useRemoveUser from "../../hooks/useRemoveUser";


type TestUser = {
  name: string;
};

const GetDataToOptions = (collection: string) => {
  const { data } = useGetFirestoreCollection({ collection });
  return data.map((user) => ({
    key: (user as TestUser).name,
    text: (user as TestUser).name,
    value: (user as TestUser).name,
  }));
};

function AdminDashboard() {
  const [deleteCV, setDeleteCV] = useState(false);
  const [chosenCV, setChosenCV] = useState(false);

  const { authState } = useOktaAuth();
  const collection = "test_users";

  const data = GetDataToOptions(collection);
  console.log("chosenCV", chosenCV);

  const test = useRemoveUser("natalie75@example.org");

  console.log('test',test);

  

  const panels = [
    {
      key: "cv",
      title: "CV",
      content: {
        content: (
          <>
            <div id="staff-cv">
              <Link
                to=""
                onClick={() => {
                  setDeleteCV(true);
                }}
              >
                <Button id="staff-button">Delete CV</Button>
              </Link>
              <Link to="/cv">
                <Button id="staff-button">Modify CV</Button>
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
              <Button  id="staff-button">Search Employee</Button>
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

  const panels2 = [
    {
      key: "cv",
      title: "CV",
      content: {
        content: (
          <div id="staff-cv">
            <Grid.Row>
              <Grid.Column width={8} floated="right">
                <Link to="">
                  <Button id="staff-button">Delete CV</Button>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </div>
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
            {deleteCV === false ? (
              <Accordion
                defaultActiveIndex={[0, 1, 2]}
                panels={panels}
                exclusive={false}
              />
            ) : (
              <>
                <Grid.Row>
                  <Accordion
                    defaultActiveIndex={[0]}
                    panels={panels2}
                    exclusive={false}
                  />
                </Grid.Row>
                <Grid columns={2}>
                  <Grid.Column width={9}>
                    <Dropdown
                      selection
                      options={data}
                      placeholder="Choose CV to delete"
                      multiSelected={false}
                      style={{ width: "100%", marginTop: "1em" }}
                      onChange={() => {
                        setChosenCV(true);
                      }}
                    />
                  </Grid.Column>
                  <Grid.Column width={6}>
                    {chosenCV && (
                      <Button
                        content="Delete"
                        icon="trash"
                        color="google plus"
                        labelPosition="left"
                        floated="right"
                        style={{ width: "70%", marginTop: "1em" }}
                      />
                    )}
                  </Grid.Column>
                </Grid>
                <Grid.Row>
                  <Button
                    content="Home"
                    icon="arrow left"
                    labelPosition="left"
                    floated="left"
                    style={{ marginTop: "1em" }}
                    onClick={() => setDeleteCV(false)}
                  />
                </Grid.Row>
              </>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </>
  );
}

export default AdminDashboard;
