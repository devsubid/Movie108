import "./Menu.css";
import React from "react";
import { Link } from "react-router-dom";
import Button from "./../../Buttons/Buttons";

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
        <Link to="/login" className="btn btn-primary">
          <Button btnText="Login" btnSize="small" btnDegree="secondary" />
        </Link>
        <Link to="/signup" className="btn btn-secondary">
          <Button btnText="Sign Up" btnSize="small" btnDegree="primary" />
        </Link>
      </div>
    </div>
  );
}

export default Menu;
