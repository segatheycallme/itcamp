import { NavLink, useLocation } from "react-router-dom"
import "./Header.css"
import logo from "../../assets/shopping-logo.svg"
import { FaShoppingCart } from "react-icons/fa"

import { Menu, Center } from '@mantine/core';
import { GiHamburgerMenu } from "react-icons/gi";

function Burger({ page }) {
  console.log(page)
  return (
    <Center className="mobajl">
      <Menu shadow="md" width={100} position="bottom-end" offset={20} transitionProps={{ transition: "slide-right", duration: 150 }}>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "aktivan" : ""}>
          <FaShoppingCart className="vauu" />
        </NavLink>
        <Menu.Target>
          <div>
            <GiHamburgerMenu style={{ color: "#eee", marginRight: "0.5em", fontSize: "3.5vh" }} />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          {page.map((el) => {
            return (
              <NavLink to={"/" + el.toLowerCase()} >
                <Menu.Item >
                  {el}
                </Menu.Item>
              </NavLink>
            )
          })}
        </Menu.Dropdown>
      </Menu>
    </Center>
  );
}

export default function Header() {
  let page = useLocation().pathname.slice(1)
  page = page === "products" ? ["Home", "Outlet", "Cart"] : ["Home", "Products", "Cart"]
  const width = window.innerWidth;

  return (<header>
    <div className="left" style={{ paddingLeft: width < 650 ? "0.5em" : "1.5em" }}>
      <NavLink to="/">
        <img src={logo} />
      </NavLink>
    </div>
    {width < 500 ?
      <Burger page={page} />
      :
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
    }
  </header>)
}
