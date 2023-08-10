import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Button,
  Table,
  Pagination,
  PaginationProps,
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

type UserTableItem = {
  key: string | undefined;
  text: string;
  value: string;
  email?: string;
  roles?: string;
};
const getUsersOptions = (
  customHook: typeof useGetCollectionWithFields,
  collectionName: string,
  fields: string[]
): UserTableItem[] => {
  const { data } = customHook(collectionName, fields);
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
  const { user: loggedInUser } = useUserContext();

  const users: UserTableItem[] = getUsersOptions(
    useGetCollectionWithFields,
    "test_users1",
    ["id", "name", "email", "roles"]
  );

  const [localUsers, setLocalUsers] = useState(users);
  const [dataFetched, setDataFetched] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<UserTableItem | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 20;

  // useEffect to trigger the deferred state update once the data is fetched
  useEffect(() => {
    if (users && users.length > 0 && !dataFetched) {
      setLocalUsers(users);
      setDataFetched(true);
    }
  }, [users, dataFetched]);

  useEffect(() => {
    setActivePage(1);
  }, [searchTerm]);

  const handlePaginationChange = (
    _event: React.MouseEvent<HTMLAnchorElement>,
    data: PaginationProps
  ) => {
    setActivePage(data.activePage as number);
  };

  const handleClick = (targetUser: UserTableItem) => {
    if (selectedUser && selectedUser.key === targetUser.key) {
      setSelectedUser(null);
    } else {
      setSelectedUser(targetUser);
    }
  };

  const modifyUser = (targetUser: UserTableItem) => {
    // add modify user functionality
    // eslint-disable-next-line no-alert
    alert(`Modifying ${JSON.stringify(targetUser)}`);
  };

  const deleteUser = (targetUser: UserTableItem) => {
    setSelectedUser(targetUser);
    setConfirmDeleteOpen(true);
  };

  const addPermissions = (targetUser: UserTableItem) => {
    // add addPermissions functionality
    // eslint-disable-next-line no-alert
    alert(`Adding permissions for ${targetUser.value}`);
  };

  const handleConfirmDelete = async () => {
    try {
      await removeUser(selectedUser?.key as string);
      setLocalUsers((prevUsers) =>
        prevUsers.filter((localUser) => localUser.key !== selectedUser?.key)
      );
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
    setConfirmDeleteOpen(false);
  };

  const filteredUsers = localUsers.filter((user) =>
    user.value?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <>
      <Container className="dashboard">
        <Grid>
          <Grid.Column width={4}>
            <UserCard name={loggedInUser?.name} email={loggedInUser?.email} />
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
                      key={user.key}
                      className="pointer-on-hover"
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
        <DeleteUserModal
          open={confirmDeleteOpen}
          user={selectedUser}
          onClose={() => setConfirmDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </Container>
    </>
  );
}

// Delete User Modal component
function DeleteUserModal({
  open,
  onClose,
  onConfirm,
  user,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  user: UserTableItem | null;
}) {
  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Content>
        <p>Are you sure you want to remove user <strong>{user?.value}</strong>?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>No</Button>
        <Button id="edu-add-button" onClick={onConfirm}>
          Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AdminDashboard;
