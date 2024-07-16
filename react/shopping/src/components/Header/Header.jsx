import { NavLink } from "react-router-dom"
import "./Header.css"
import logo from "../../assets/shopping-logo.svg"
import { FaShoppingCart } from "react-icons/fa"

import { Menu, Center } from '@mantine/core';
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { context } from "../../App";

function Cart() {
  const [cartItems, _] = useContext(context)

  return (
    <div className="cart">
      <FaShoppingCart>
      </FaShoppingCart>
      {cartItems.length ?
        <div className="reddot">{cartItems.length}</div>
        : <div />
      }
    </div>
  )
}

function Burger() {
  return (
    <Center className="mobajl">
      <Menu shadow="md" width={100} position="bottom-end" offset={20} transitionProps={{ transition: "slide-right", duration: 150 }}>
        <NavLink to="/cart">
          <Cart />
        </NavLink>
        <Menu.Target>
          <div>
            <GiHamburgerMenu style={{ color: "#eee", marginRight: "0.5em", marginLeft: "0.5em", fontSize: "3.5vh" }} />
          </div>
        </Menu.Target>

        <Menu.Dropdown>
          <NavLink to={"/"} >
            <Menu.Item >
              Home
            </Menu.Item>
          </NavLink>
          <NavLink to={"/sportswear"} >
            <Menu.Item >
              Sportswear
            </Menu.Item>
          </NavLink>
          <NavLink to={"/footwear"} >
            <Menu.Item >
              Footwear
            </Menu.Item>
          </NavLink>
          <NavLink to={"/socks"} >
            <Menu.Item >
              socks
            </Menu.Item>
          </NavLink>

        </Menu.Dropdown>
      </Menu>
    </Center>
  );
}

export default function Header() {
  const width = window.innerWidth;

  return (<header>
    <div className="left" style={{ paddingLeft: width < 850 ? "0.5em" : "1em" }}>
      <NavLink to="/">
        <img src={logo} />
      </NavLink>
    </div>
    {width < 700 ?
      <Burger />
      :
      <div className="right">
        <NavLink to="/sportswear" className={({ isActive }) => isActive ? "aktivan" : ""}>
          <span className="vauu">Sportswear</span>
        </NavLink>
        <NavLink to="/footwear" className={({ isActive }) => isActive ? "aktivan" : ""}>
          <span className="vauu">Footwear</span>
        </NavLink>
        <NavLink to="/socks" className={({ isActive }) => isActive ? "aktivan" : ""}>
          <span className="vauu">Socks</span>
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? "aktivan" : ""}>
          <Cart />
        </NavLink>
      </div>
    }
  </header>)
}
