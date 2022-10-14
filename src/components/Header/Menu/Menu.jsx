import "./Menu.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "./../../Button/Button";

function Menu({ menuItems, menuOpen, setMenuOpen }) {
  let handleMenuItem = (e) => {
    document.querySelector(".menu-item.active") &&
      document.querySelector(".menu-item.active").classList.remove("active");
    e.target.classList.add("active");
    // setMenuOpen(false);
  };
  return (
    <div className={`menu ${menuOpen && "active"}`} role="menu">
      {menuItems.map((item, index) => (
        <div
          className={`menu-item ${!index && "active"}`}
          role="menuitem"
          key={item}
          onClick={(e) => {
            handleMenuItem(e);
          }}
        >
          {item}
        </div>
      ))}
      <div
        className="menu-item menu-item--button"
        role="menuitem"
        onClick={(e) => {
          handleMenuItem(e);
        }}
      >
        <Link to="/login">
          <Button className="secondary" btnProperty="small">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button className="primary" btnProperty="small primary">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
