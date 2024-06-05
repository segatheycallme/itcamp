import { NavLink } from "react-router-dom";
import "./Navbar.css";
export function Navbar() {
  return (
    <header>
      <div className="wrapper">
        <div className="logo">
          <NavLink to="/">
            <h1 className="logo-text">SAKIley</h1>
          </NavLink>
        </div>
        <div className="listing">
          <ul>
            <NavLink
              to="/hotels"
              className={({ isActive }) =>
                isActive ? "active-link li" : "classic-link li"
              }
            >
              Hotels
            </NavLink>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                isActive ? "active-link li" : "classic-link li"
              }
            >
              Your list
            </NavLink>
            <NavLink
              to="/apartments"
              className={({ isActive }) =>
                isActive ? "active-link li" : "classic-link li"
              }
            >
              Apartmens
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive ? "active-link li" : "classic-link li"
              }
            >
              About us
            </NavLink>
          </ul>
          <button>Log in</button>
        </div>
      </div>
    </header>
  );
}
