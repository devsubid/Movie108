import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu/Menu";
import Button from "./../Buttons/Buttons";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  let menuItems = [
    "Release Calendar",
    "Top 250 Movies",
    "Most Popular Movies",
    "Browse Movies by Genre",
    "Top Box Office",
    "Showtimes & Tickets",
    "Movie News",
    "India Movie Spotlight",
  ];
  let changeMode = () => {
    let body = document.body;
    body.classList.toggle("light");
    localStorage.setItem(
      "mode",
      body.classList.contains("light") ? "light" : "dark"
    );
  };
  return (
    <div className="home">
      <div className="home__container">
        <header>
          <div className="wrapper">
            <div className="heading">
              <h1>
                <div
                  className="menu-icon"
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <div className="svg"></div>
                </div>
                <Link to="/">Movie108</Link>
              </h1>
              <div className="right-header">
                <div
                  className="modeToggler"
                  onClick={() => {
                    changeMode();
                  }}
                >
                  <div className="svg"></div>
                </div>
                <div className="buttons">
                  <Link to="/login" className="btn btn-primary">
                    <Button btnText="Login" btnSize="small" btnDegree="secondary" />
                  </Link>
                  <Link to="/signup" className="btn btn-secondary">
                    <Button btnText="Sign Up" btnSize="small" btnDegree="primary" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Menu menuItems={menuItems} menuOpen={menuOpen} />
      </div>
    </div>
  );
}

export default Header;
