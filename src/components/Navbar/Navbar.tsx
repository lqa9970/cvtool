import { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Icon, Segment, Popup, Button } from "semantic-ui-react";
import logo from "../../assets/cloud-logo.png";

import ninja from "../../assets/ninja.png";
import useGetUser from "../../hooks/useGetUser";

import "./Navbar.scss";
import { EmployeeUser } from "../../types/types";

type IPopupContentProps = {
  user: EmployeeUser | null;
  userRole: string;
  handleChangeRole: (value: string) => void;
};

function PopupContent({
  user,
  userRole,
  handleChangeRole,
}: IPopupContentProps) {
  return (
    <>
      <div className="PopupContent">
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
        <p>Roles:</p>
        {user?.roles?.map((role, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "1em",
            }}
          >
            {userRole === role.name ? (
              <Button
                style={{ backgroundColor: "#161632" }}
                color="green"
                onClick={() => handleChangeRole(role.name)}
              >
                <span>{role.name}</span>
              </Button>
            ) : (
              <Button onClick={() => handleChangeRole(role.name)}>
                <span>{role.name}</span>
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function Navbar() {
  const [loading, _setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userRole, setUserRole] = useState<string | undefined>("talent");
  const { authState } = useOktaAuth();
  const [user] = useGetUser(authState?.idToken?.claims.email || "");

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const handleChangeRole = (role: string) => {
    setUserRole(role);
  };

  // TODO: Loading is never set anywhere?
  if (loading === false) {
    switch (userRole) {
      case "staff":
        return (
          <>
            <Segment id="nav" className="nav-content">
              <div className="NavContent_logo">
                <a href="/">
                  <img src={logo} alt="Nordcloud, an IBM compunknown" />
                </a>
              </div>
              <div className="NavContent_pages">
                <a href="/staffing">
                  <Icon name="clipboard" size="small" />
                  dashboard
                </a>
                <a href="#">
                  <Icon name="bars" size="small" />
                  projects
                </a>
                <a href="#">
                  <Icon name="briefcase" size="small" />
                  talents
                </a>
              </div>
              <div className="NavContent_user">
                <Popup
                  on="click"
                  position="bottom center"
                  size="large"
                  content={
                    <PopupContent
                      handleChangeRole={handleChangeRole}
                      user={user}
                      userRole={userRole}
                    />
                  }
                  trigger={
                    /* TODO: You shouldn't use a for buttons! Bad for accesibility */
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <a onClick={handleClick}>
                      <img src={ninja} alt="Ninja avatar" />
                      <p>{user?.name?.split(" ")[0]}</p>
                      {openModal === false ? (
                        <Icon inverted name="chevron down" />
                      ) : (
                        <>
                          <Icon inverted name="chevron up" />
                        </>
                      )}
                    </a>
                  }
                />
              </div>
            </Segment>
          </>
        );

      case "talent":
        return (
          <>
            <Segment id="Nav" className="NavContent">
              <div className="NavContent_logo">
                <a
                  href="https://nordcloud.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={logo} alt="Nordcloud, an IBM compunknown" />
                </a>
              </div>
              <div className="NavContent_user">
                <Popup
                  on="click"
                  position="bottom center"
                  size="large"
                  content={
                    <PopupContent
                      handleChangeRole={handleChangeRole}
                      user={user}
                      userRole={userRole}
                    />
                  }
                  trigger={
                    // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                    <a onClick={handleClick}>
                      <img src={ninja} alt="Ninja avatar" />
                      <p>{user?.name?.split(" ")[0]}</p>
                      {openModal === false ? (
                        <Icon inverted name="chevron down" />
                      ) : (
                        <>
                          <Icon inverted name="chevron up" />
                        </>
                      )}
                    </a>
                  }
                />
              </div>
            </Segment>
          </>
        );

      default:
        return <p>Invalid role!</p>;
    }
  } else {
    return <p>Loading...</p>;
  }
}

export default Navbar;
