import "./Menu.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "./../../Button/Button";

function Menu({ menuItems, menuOpen }) {
  return (
    <div className={`menu ${menuOpen && "active"}`} role="menu">
      {menuItems.map((item) => (
        <div
          className="menu-item"
          role="menuitem"
          key={item}
          onClick={(e) => {
            console.log(e.target.textContent);
          }}
        >
          {item}
        </div>
      ))}
      <div
        className="menu-item menu-item--button"
        role="menuitem"
        onClick={(e) => {
          console.log(e.target.textContent);
        }}
      >
        <Link to="/login">
          <Button className="small secondary">Login</Button>
        </Link>
        <Link to="/signup">
          <Button className="small primary">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}

export default Menu;
