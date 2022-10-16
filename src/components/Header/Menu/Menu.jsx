import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./../../Button/Button";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 5.5rem);
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
  z-index: 1;
  &.active {
    transform: translateX(0);
    opacity: 1;
  }
  .light & {
    background-color: rgb(var(--light-color));
  }
  @media screen and (min-width: 50rem) {
    & {
      padding-block: 1rem;
      margin-top: 5rem;
      height: calc(100vh - 5rem);
    }
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
    @media screen and (min-width: 950px) {
      & {
        display: none;
      }
    }
  }
`;

function Menu({ menuItems, menuOpen, setMenuOpen }) {
  let handleMenuItem = (e) => {
    document.querySelector(".menu-item.active") &&
      document.querySelector(".menu-item.active").classList.remove("active");
    e.target.classList.add("active");
    setMenuOpen(false);
  };
  return (
    <StyledMenu className={`menu ${menuOpen && "active"}`} role="menu">
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
    </StyledMenu>
  );
}

export default Menu;
