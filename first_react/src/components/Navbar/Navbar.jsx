import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export default function Navbar() {
  let { user, setUser } = useContext(AppContext)
  const links = !user ? [] : ["Hotels", "Quotes", "Teams", "Demo", "About us"]

  return (
    <header>
      <div className="logo">
        <NavLink to="/">
          <h1>
            <span style={{ color: "#2d74b7" }}>tri</span>
            <span style={{ color: "#e27c1f" }}>va</span>
            <span style={{ color: "#a3171b" }}>go</span>
          </h1>
        </NavLink>
      </div>
      <div className="listing">
        {links.map((el, i) => {
          return (
            <NavLink
              className={({ isActive }) => isActive ? "aktivan" : "pasivan"}
              key={i}
              to={el.toLowerCase().replace(" ", "-")}>
              <h3>{el}</h3>
            </NavLink>
          )
        })}
        {!user ? "" :
          <button onClick={() => { setUser(null) }}>Logout</button>
        }
      </div>
    </header >
  );
}
