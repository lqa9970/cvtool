import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Segment } from "semantic-ui-react";
import logo from "../../assets/cloud-logo.png";
import { useUserContext } from "../../context/UserContext";
import { EmployeeUser } from "../../types/types";
import AccountMenu from "./AccountMenu/AccountMenu";

import "./Navbar.scss";

function Navbar() {
  const { user } = useUserContext();
  const defautUserRole = localStorage.getItem("userRole") as string;
  const [userRole, setUserRole] = useState<string>(defautUserRole);

  const handleRoleChange = (role: string) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
  };

  useEffect(() => {
    if (!userRole) {
      localStorage.setItem("userRole", user?.roles[0].name as string);
    }
  }, [userRole, user]);

  if (userRole === "talent") {
    return (
      <>
        <Segment id="Nav" className="NavContent">
          <div className="NavContent_logo">
            <Link to="/" rel="noreferrer">
              <img src={logo} alt="Nordcloud, an IBM company" />
            </Link>
          </div>
          <AccountMenu
            user={user as EmployeeUser}
            userRole={userRole}
            onRoleChange={handleRoleChange}
          />
        </Segment>
      </>
    );
  }
  return (
    <>
      <Segment id="Nav" className="NavContent">
        <div className="NavContent_logo">
          <Link to="/">
            <img src={logo} alt="Nordcloud, an IBM company" />
          </Link>
        </div>
        <AccountMenu
          user={user as EmployeeUser}
          userRole={userRole}
          onRoleChange={handleRoleChange}
        />
      </Segment>
    </>
  );
}

export default Navbar;
