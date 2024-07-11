import { NavLink } from "react-router-dom"
import "./Header.css"
import logo from "../../assets/shopping-logo.svg"
import { FaShoppingCart } from "react-icons/fa"

export default function Header() {
  return (<header>
    <div className="left">
      <NavLink to="/">
        <img src={logo} />
      </NavLink>
    </div>
    <div className="right">
      <NavLink to="/products" className={({ isActive }) => isActive ? "aktivan" : ""}>
        <span className="vauu">Products</span>
      </NavLink>
      <NavLink to="/outlet" className={({ isActive }) => isActive ? "aktivan" : ""}>
        <span className="vauu">Outlet</span>
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? "aktivan" : ""}>
        <FaShoppingCart className="vauu" />
      </NavLink>
    </div>
  </header>)
}
