import { Link } from "react-router-dom";

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
    <Link
      className={buttonClassName}
      to={role.name === "talent" ? "/" : `/${role.name}`}
      onClick={handleButtonClick}
    >
      {role.name}
    </Link>
  );
}

export default RoleButton;
