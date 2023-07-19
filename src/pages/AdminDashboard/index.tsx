import { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Accordion,
  Button,
  DropdownProps,
} from "semantic-ui-react";

import "./admin.scss";
import SearchableSelect from "../../components/Dropdown/SearchableSelect";
import UserCard from "../../components/UserCard/UserCard";
import useGetFirestoreCollection from "../../hooks/useGetCollectionData";
import removeUser from "../../hooks/useRemoveUser";
import { EmployeeUser } from "../../types/types";

const GetDataToOptions = (collection: string) => {
  const { data } = useGetFirestoreCollection({ collection });
  const typedData = data as EmployeeUser[];
  return typedData.map((user) => ({
    key: user.email,
    text: user.name,
    value: user.name,
  }));
};

function AdminDashboard() {
  const [isDeleteActive, setDeleteActive] = useState(false);
  const [chosenCV, setChosenCV] = useState("");
  const { authState } = useOktaAuth();

  const users = GetDataToOptions("test_users1");

  const handleOnSelect = (data: DropdownProps) => {
    const selectedUser = data.options?.find(
      (user) => user.value === data.value
    );
    setChosenCV(selectedUser?.key as string);
  };
  const handleDeleteCV = async () => {
    return await removeUser(chosenCV);
  };

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
                  setDeleteActive(true);
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
            {!isDeleteActive ? (
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
                    <div id="dropdown">
                      <SearchableSelect
                        allOptions={users}
                        placeholder="Choose CV to delete"
                        onSelect={(data: DropdownProps) => handleOnSelect(data)}
                      />
                    </div>
                  </Grid.Column>
                  <Grid.Column width={6}>
                    {chosenCV.length > 0 && (
                      <Button
                        id="delete-button"
                        content="Delete"
                        icon="trash"
                        color="google plus"
                        labelPosition="left"
                        floated="right"
                        onClick={handleDeleteCV}
                      />
                    )}
                  </Grid.Column>
                </Grid>
                <Grid.Row>
                  <Button
                    id="back-button"
                    content="Home"
                    icon="arrow left"
                    labelPosition="left"
                    floated="left"
                    onClick={() => setDeleteActive(false)}
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
