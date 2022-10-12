import "./Menu.css";
import React from "react";

function Menu({menuItems, menuOpen}) {
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
      </div>
  );
}

export default Menu;
