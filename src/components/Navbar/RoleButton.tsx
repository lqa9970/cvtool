import { Button } from "semantic-ui-react";

type RoleButtonProps = {
  role: {
    name: string;
  };
  active: boolean;
  onClick: (roleName: string) => void;
};

function RoleButton({ role, active, onClick }: RoleButtonProps) {
  const handleButtonClick = () => {
    onClick(role.name);
  };

  const buttonClassName = `RoleButton ${active ? "active" : ""}`;

  return (
    <Button className={buttonClassName} onClick={handleButtonClick}>
      {role.name}
    </Button>
  );
}

export default RoleButton;
