import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";
import { Icon, Segment } from "semantic-ui-react";
import logo from "../../assets/cloud-logo.png";
import useUserByEmail from "../../hooks/useUserByEmail";
import { EmployeeUser } from "../../types/types";
import AccountMenu from "./AccountMenu";

import "./Navbar.scss";

function Navbar() {
  const { authState } = useOktaAuth();
  const [user] = useUserByEmail(authState?.idToken?.claims.email ?? "");
  const [userRole, setUserRole] = useState<string>("talent");

  const handleRoleChange = (role: string) => {
    setUserRole(role);
  };

  useEffect(() => {
    if (!userRole) {
      setUserRole(user?.roles[0].name as string);
    }
  }, [userRole, user]);

  switch (userRole) {
    case "staff":
    case "admin":
      return (
        <>
          <Segment id="Nav" className="NavContent">
            <div className="NavContent_logo">
              <Link to="/">
                <img src={logo} alt="Nordcloud, an IBM company" />
              </Link>
            </div>
            <div className="NavContent_pages">
              <Link to="/staff">
                <Icon name="clipboard" size="small" />
                dashboard
              </Link>
              <Link to="/#">
                <Icon name="bars" size="small" />
                projects
              </Link>
              <Link to="/#">
                <Icon name="briefcase" size="small" />
                talents
              </Link>
            </div>
            <AccountMenu user={user as EmployeeUser} userRole={userRole} onRoleChange={handleRoleChange}/>
          </Segment>
        </>
      );

    case "talent":
      return (
        <>
          <Segment id="Nav" className="NavContent">
            <div className="NavContent_logo">
              <Link to="/" rel="noreferrer">
                <img src={logo} alt="Nordcloud, an IBM company" />
              </Link>
            </div>
            <AccountMenu user={user as EmployeeUser} userRole={userRole} onRoleChange={handleRoleChange}/>
          </Segment>
        </>
      );

    default:
      return <p>Please log in.</p>;
  }
}

export default Navbar;
