import { EmployeeUser } from "../../types/types";
import RoleButton from "./RoleButton";

type PopupContentProps = {
  user: EmployeeUser | null;
  userRole?: string;
  onRoleChange: (role: string) => void;
};

function PopupContent({ user, userRole, onRoleChange }: PopupContentProps) {
  return (
    <div className="PopupContent">
      {user ? (
        <>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <div>
            <span>Roles:</span>
            <div className="RoleButtonContainer">
              {user.roles?.map((role) => (
                <RoleButton
                  key={role.name}
                  role={role}
                  active={userRole === role.name}
                  onClick={onRoleChange}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  );
}

export default PopupContent;
