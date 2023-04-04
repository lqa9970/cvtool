import { useState } from "react"
import "./Navbar.css"
import { StickyBar } from "@nordcloud/gnui"

const Navbar = () => {
  // const [item, setItem] = useState({})
  return (
    <>
      <StickyBar>
        <div className="NavContent">
          <div className="NavContent left">
            <a href="#">dashboard</a>
            <a href="#">projects</a>
            <a href="#">talents</a>
          </div>
          <div className="NavContent right">
            <a href="profile">profile</a>
          </div>
        </div>
      </StickyBar>
    </>
  )
}

export default Navbar
