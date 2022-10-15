import "./Header.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu/Menu";
import Button from "./../Button/Button";

const RightHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-grow: 1;
  & .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  @media screen and (max-width: 950px) {
    & {
      gap: 0;
      & .buttons{
        display: none;
      }
    }
  }
`;

const SearchBox = styled.div`
  display: flex;
  place-content: center;
  font-size: 1.5rem;
  flex-grow: 1;
  position: relative;
  & input {
    width: 10rem;
    margin-left: auto;
    outline: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgb(var(--light-color), 0.3);
    background-color: transparent;
    color: rgb(var(--light-color));
    font-size: 1rem;
    font-weight: 300;
    transition: all 0.15s ease;
  }
  & input:focus {
    width: 90%;
    border: 1px solid rgb(var(--primary-color));
  }
  & input::placeholder {
    color: rgb(var(--light-color), 0.5);
    transition: all 0.15 ease;
  }
  .light & input {
    color: rgb(var(--dark-color));
    border: 1px solid rgb(var(--dark-color), 0.5);
    caret-color: rgb(var(--dark-color));
  }
  .light & input::placeholder {
    color: rgb(var(--dark-color));
  }
  & form {
    padding: 0;
  }
  & button {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.25rem;
    background: transparent;
    outline: none;
    border: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    & ion-icon {
      font-size: 1.5rem;
      color: rgb(var(--light-color), 0.5);
      transition: all 0.15s ease;
    }
  }
  & > ion-icon {
    display: none;
    font-size: 1.5rem;
    color: rgb(var(--light-color), 0.5);
    transition: all 0.15s ease;
  }
  @media screen and (max-width: 50rem) {
    & {
      position: static;
    }
    & button {
      position: static;
      z-index: 3;
    }
    & button.active {
      position: absolute;
      right: 2rem;
    }
    & input {
      display: none;
      &.active {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        border: none;
        background-color: rgb(var(--dark-color));
        z-index: 2;
        margin: 0;
        width: 100%;
        height: 100%;
        padding-inline-start: 4rem;
      }
      &.active + ion-icon {
        z-index: 3;
        display: block;
        position: absolute;
        left: 2rem;
        top: 0;
        bottom: 0;
        margin-block: auto;
      }
    }
  }
  & input:focus + button ion-icon {
    color: rgb(var(--light-color), 0.8);
  }
`;

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
    "About Us",
    "Contact Us",
  ];
  let changeMode = () => {
    let body = document.body;
    body.classList.toggle("light");
    localStorage.setItem(
      "mode",
      body.classList.contains("light") ? "light" : "dark"
    );
  };
  let activeSearch = () => {
    document.querySelector("#query").classList.toggle("active");
    document.querySelector("#searchBtn").classList.toggle("active");
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
              <RightHeader className="right-header">
                <SearchBox>
                  <input
                    type="text"
                    name="query"
                    id="query"
                    autoComplete="off"
                    placeholder="Search"
                  />
                  <ion-icon
                    name="arrow-back-outline"
                    onClick={() => activeSearch()}
                  ></ion-icon>
                  <button id="searchBtn" onClick={() => activeSearch()}>
                    <ion-icon name="search-outline"></ion-icon>
                  </button>
                </SearchBox>
                <div
                  className="modeToggler"
                  onClick={() => {
                    changeMode();
                  }}
                >
                  <div className="svg"></div>
                </div>
                <div className="buttons">
                  <Link to="/login">
                    <Button className="secondary" btnProperty="small secondary">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="primary" btnProperty="small primary">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </RightHeader>
            </div>
          </div>
        </header>
        <Menu
          menuItems={menuItems}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </div>
  );
}

export default Header;
