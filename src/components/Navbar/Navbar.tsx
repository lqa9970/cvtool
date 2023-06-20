import { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Icon, Segment, Popup, Button } from "semantic-ui-react";
import logo from "../../assets/cloud-logo.png";

import ninja from "../../assets/ninja.png";
import useGetUser from "../../hooks/useGetUser";

import "./Navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  // setLoading is not used anywhere. The componenet is never in a "loading" state.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const [userRole, setUserRole] = useState<string | undefined>("talent");
  const { authState } = useOktaAuth();
  const [user] = useGetUser(authState?.idToken?.claims.email ?? "");

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const handleChangeRole = (role: string) => {
    setUserRole(role);
  };

  function PopupContent() {
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

  if (loading === false) {
    switch (userRole) {
      case "staff":
        return (
          <>
            <Segment id="Nav" className="NavContent">
              <div className="NavContent_logo">
                <Link to="/">
                  <img src={logo} alt="Nordcloud, an IBM company" />
                </Link>
              </div>
              <div className="NavContent_pages">
                <Link to="/staffing">
                  <Icon name="clipboard" size="small" />
                  dashboard
                </Link>
                <a>
                  <Icon name="bars" size="small" />
                  projects
                </a>
                <a>
                  <Icon name="briefcase" size="small" />
                  talents
                </a>
              </div>
              <div className="NavContent_user">
                <Popup
                  on="click"
                  content={<PopupContent />}
                  position="bottom center"
                  size="large"
                  trigger={
                    // ! Bad for accesibility
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
                <a href="/" rel="noreferrer">
                  <img src={logo} alt="Nordcloud, an IBM company" />
                </a>
              </div>
              <div className="NavContent_user">
                <Popup
                  on="click"
                  content={<PopupContent />}
                  position="bottom center"
                  size="large"
                  trigger={
                    // ! Bad for accesibility.
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
        break;
    }
  } else {
    return <p>Loading...</p>;
  }
}

export default Navbar;
