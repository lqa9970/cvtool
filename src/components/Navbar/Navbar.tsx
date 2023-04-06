import { useState } from "react"
import logo from "../../assets/cloud-logo.png"
import { Icon } from "semantic-ui-react"

import "./Navbar.scss"

const Navbar = () => {
  // const [item, setItem] = useState({})
  return (
    <>
      <div className="NavContent">
        <div className="NavContent_logo">
          <a href="">
            <img src={logo} alt="Nordcloud, an IBM company" />
          </a>
        </div>
        <div className="NavContent_pages">
          <a href="#">
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
      </div>
    </>
  )
}

export default Navbar
