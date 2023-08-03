import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Accordion,
  Button,
  DropdownProps,
  Table,
  Pagination,
  Input,
  Icon,
  Header,
  Modal,
} from "semantic-ui-react";

import "./admin.scss";
import UserCard from "../../components/UserCard/UserCard";
import { useUserContext } from "../../context/UserContext";
import useGetCollectionWithFields from "../../hooks/useGetCollectionWithFields";
import removeUser from "../../hooks/useRemoveUser";
import { EmployeeUser } from "../../types/types";

type DropdownOption = {
  key: string | undefined;
  text: string;
  value: string;
  email?: string;
  roles?: any;
};
const getUsersOptions = (
  customHook: typeof useGetCollectionWithFields,
  collectionName: string,
  fields: string[]
): DropdownOption[] => {
  const { data } = customHook(collectionName, fields);
  console.log(data);

  const typedData = data as EmployeeUser[];
  return typedData.map((user) => ({
    key: user.id,
    text: user.name,
    value: user.name,
    email: user.email,
    roles: user.roles.map((role) => role.name).join(", "),
  }));
};

function AdminDashboard() {
  const [dataFetched, setDataFetched] = useState(false);
  const [chosenCV, setChosenCV] = useState("");
  const { user } = useUserContext();

  const users = getUsersOptions(useGetCollectionWithFields, "test_users1", [
    "id",
    "name",
    "email",
    "roles",
  ]);
  const [localUsers, setLocalUsers] = useState<DropdownOption[]>(users);

  // useEffect to trigger the deferred state update once the data is fetched
  useEffect(() => {
    if (users && users.length > 0 && !dataFetched) {
      setLocalUsers(users);
      setDataFetched(true);
    }
  }, [users, dataFetched]);


  const [activePage, setActivePage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const itemsPerPage = 20;

  const handlePaginationChange = (
    e: React.SyntheticEvent,
    { activePage }: any
  ) => {
    setActivePage(activePage);
  };
  const handleClick = (user: any) => {
    if (selectedUser && selectedUser.key === user.key) {
      setSelectedUser(null);
      setChosenCV(selectedUser?.key as string);
    } else {
      setSelectedUser(user);
      setChosenCV(selectedUser?.key as string);
    }
  };

  const modifyUser = (user: any) => {
    // add modify user functionality
    alert(`Modifying ${user.value}`);
  };

  const deleteUser = (user: any) => {
    setSelectedUser(user);
    setConfirmDeleteOpen(true);
  };

  const addPermissions = (user: any) => {
    // add addPermissions functionality
    alert(`Adding permissions for ${user.value}`);
  };

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      await removeUser(selectedUser.key);
      setLocalUsers((prevUsers) =>
        prevUsers.filter((localUser) => localUser.key !== selectedUser.key)
      );
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
    setConfirmDeleteOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.value?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  useEffect(() => {
    setActivePage(1);
  }, [searchTerm]);

  return (
    <>
      <Container className="dashboard">
        <Grid>
          <Grid.Column width={4}>
            <UserCard name={user?.name} email={user?.email} />
          </Grid.Column>
          <Grid.Column width={11}>
            <div className="search-input">
              <Input
                icon={<Icon name="search" />}
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Header as="h3">Total No. of Talents: {users.length}</Header>
            <i>( Click on the row to perform action)</i>
            <Table celled className="ui table">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                  <Table.HeaderCell>Permissions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {paginatedUsers.map((user) => (
                  <>
                    <Table.Row
                      className="pointer-on-hover"
                      key={user.key}
                      onClick={() => handleClick(user)}
                    >
                      <Table.Cell>{user.value}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.roles}</Table.Cell>
                    </Table.Row>

                    {selectedUser && selectedUser.key === user.key && (
                      <Table.Row>
                        <Table.Cell colSpan="3">
                          <Button
                            id="edu-add-button"
                            onClick={() => modifyUser(selectedUser)}
                          >
                            Modify CV
                          </Button>
                          <Button
                            id="edu-add-button"
                            onClick={() => deleteUser(selectedUser)}
                          >
                            Delete CV
                          </Button>
                          <Button
                            id="edu-add-button"
                            onClick={() => addPermissions(selectedUser)}
                          >
                            Add Permissions
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </>
                ))}
              </Table.Body>
            </Table>
            <div className="pagination-container">
              <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(filteredUsers.length / itemsPerPage)}
                onPageChange={handlePaginationChange}
              />
            </div>
          </Grid.Column>
        </Grid>
        <Modal
          size="tiny"
          open={confirmDeleteOpen}
          onClose={() => setConfirmDeleteOpen(false)}
        >
          <Modal.Header>Delete User</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {selectedUser?.name}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setConfirmDeleteOpen(false)}>No</Button>
            <Button id="edu-add-button" onClick={handleConfirmDelete}>
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </Container>
    </>
  );
}

export default AdminDashboard;
