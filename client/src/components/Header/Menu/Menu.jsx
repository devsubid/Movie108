import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "./../../Button/Button";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4.5rem);
  width: 18rem;
  background-color: rgb(var(--dark-color));
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow-y: auto;
  gap: 1rem;
  padding-block: 1rem;
  margin-top: 4.5rem;
  opacity: 0;
  transform: translateX(-100%);
  transition: all 0.15s ease;
  z-index: 3;
  &.active {
    transform: translateX(0);
    opacity: 1;
  }
  .light & {
    background-color: rgb(var(--light-color));
  }
  @media screen and (min-width: 50rem) {
    & {
      margin-top: 5rem;
      height: calc(100vh - 5rem);
    }
  }
  & a:hover {
    color: inherit;
    text-decoration: none;
  }
  & .menu-item {
    position: relative;
    margin-right: 1rem;
    padding: 1rem 3rem;
    font-size: 1rem;
    text-decoration: none;
    text-transform: capitalize;
    border-top-right-radius: 50rem;
    border-bottom-right-radius: 50rem;
    transition: all 0.15s ease;
    cursor: pointer;
    &:hover {
      color: rgba(var(--primary-color), 1);
    }
    &.active {
      color: rgba(var(--primary-color), 1);
      background-color: rgba(var(--primary-color), 0.1);
    }
  }
  & .menu-item--button {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.15s ease;
    @media screen and (min-width: 50rem) {
      & {
        opacity: 0;
        visibility: hidden;
      }
    }
  }
`;

function Menu({ menuItems, menuOpen, setMenuOpen }) {
  const location = useLocation();
  let handleMenuItem = (e) => {
    document.querySelector(".menu-item.active") &&
      document.querySelector(".menu-item.active").classList.remove("active");
    e.target.classList.add("active");
    setMenuOpen(false);
  };
  return (
    <StyledMenu className={`menu ${menuOpen && "active"}`} role="menu">
      {menuItems.map((item, index) => (
        <Link
          to={
            "/" +
            (item.toLowerCase() === "home"
              ? ""
              : item.toLowerCase().replace(" ", ""))
          }
          key={index}
        >
          <div
            className={`menu-item ${
              "/" +
                (item.toLowerCase() === "home"
                  ? ""
                  : item.toLowerCase().replace(" ", "")) ===
                location.pathname && "active"
            }`}
            role="menuitem"
            onClick={(e) => {
              handleMenuItem(e);
            }}
          >
            {item}
          </div>
        </Link>
      ))}
      <div
        className="menu-item menu-item--button"
        role="menuitem"
        onClick={(e) => {
          handleMenuItem(e);
        }}
      >
        {!localStorage.getItem("token") ? (
          <>
            <Link to="/login">
              <Button
                className="secondary"
                btnProperty="small secondary"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                className="primary"
                btnProperty="small primary"
                style={{ width: "100%" }}
              >
                Sign Up
              </Button>
            </Link>
          </>
        ) : (
          <Button
            className="primary"
            btnProperty="small primary"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </StyledMenu>
  );
}

export default Menu;
