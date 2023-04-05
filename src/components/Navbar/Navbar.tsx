import { useState } from "react"
import "./Navbar.scss"
import logo from "../../assets/cloud-logo.png"

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
          <a href="#">dashboard</a>
          <a href="#">projects</a>
          <a href="#">talents</a>
        </div>
      </div>
    </>
  )
}

export default Navbar
