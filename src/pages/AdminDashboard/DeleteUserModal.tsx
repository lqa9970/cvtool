import { Button, Modal } from "semantic-ui-react";
import { UserTableItem } from "../../types/types";

type DeleteUserModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  user: UserTableItem | null;
};

// Delete User Modal component
function DeleteUserModal({
  open,
  onClose,
  onConfirm,
  user,
}: DeleteUserModalProps) {
  return (
    <Modal size="tiny" open={open} onClose={onClose}>
      <Modal.Header>Delete User</Modal.Header>
      <Modal.Content>
        <p>
          Are you sure you want to remove user <strong>{user?.value}</strong>?
        </p>
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

export default DeleteUserModal;
