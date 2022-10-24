import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import moon from "./../../assets/moon.svg";
import sun from "./../../assets/sun.svg";
import menu from "./../../assets/menu.svg";
import Menu from "./Menu/Menu";
import Button from "./../Button/Button";
import ModalContext from "./../../context/modal/modalContext";
import SearchContext from "./../../context/searchParams/searchContext";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-block: 1rem;
  background: rgb(var(--dark-color));
  z-index: 2;
  transition: all 0.15s ease;
  .light & {
    background: rgb(var(--light-color));
  }
  & > div {
    margin-inline: auto;
    width: 90%;
  }
  & > .wrapper > .heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .heading h1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-shadow: 0 0 20px rgba(var(--light-color), 0.25);
  }
  & .modeToggler {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.25rem;
    z-index: 1;
    border-radius: 50%;
    transition: all 0.15s ease;
    &:hover {
      backdrop-filter: invert(0.1);
    }
    .light &:hover {
      backdrop-filter: brightness(0.9);
    }
    & .svg {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: rgb(var(--light-color));
      mask: url(${moon}) no-repeat center;
      transition: all 0.15s ease;
      cursor: pointer;
      &:active {
        scale: 1.15;
      }
      &:hover {
        filter: brightness(0.8);
      }
      .light &:hover {
        filter: invert(0.2);
      }
      .light & {
        background: rgb(var(--dark-color));
        mask: url(${sun}) no-repeat center;
      }
    }
  }
  & .menu-icon {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    padding: 0.25rem;
    z-index: 1;
    border-radius: 50%;
    transform: rotate(0deg);
    transition: all 0.15s ease;
    &:active {
      transform: rotate(180deg);
    }
    .light &:hover {
      backdrop-filter: brightness(0.9);
    }
    &:hover {
      backdrop-filter: invert(0.1);
    }
    & .svg {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      background: rgb(var(--light-color));
      mask: url(${menu}) no-repeat center;
      transition: all 0.15s ease;
      cursor: pointer;
      &:hover {
        filter: brightness(0.8);
      }
      .light &:hover {
        filter: invert(0.2);
      }
      .light & {
        background: rgb(var(--dark-color));
      }
    }
  }
  & .wrapper > .heading {
    display: flex;
    justify-content: space-between;
  }
`;

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
  @media screen and (max-width: 50rem) {
    & {
      gap: 0;
      & .buttons {
        display: none;
      }
    }
  }
`;

const SearchBox = styled.form`
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
    &:focus {
      width: 90%;
      border: 1px solid rgb(var(--primary-color));
    }
    &::placeholder {
      color: rgb(var(--light-color), 0.5);
      transition: all 0.15 ease;
    }
    .light & {
      color: rgb(var(--dark-color));
      border: 1px solid rgb(var(--dark-color), 0.5);
      caret-color: rgb(var(--dark-color));
      &:focus {
        border-color: rgb(var(--primary-color));
      }
    }
    .light &::placeholder {
      color: rgb(var(--dark-color));
    }
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
    display: flex;
    align-items: center;
    &:hover {
      box-shadow: none;
    }
    & ion-icon {
      font-size: 1.5rem;
      color: rgb(var(--light-color), 0.5);
      transition: all 0.15s ease;
      .light & {
        color: rgb(var(--dark-color), 0.5);
      }
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
      margin-left: auto;
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
        border-radius: 0;
        .light & {
          background-color: rgb(var(--light-color));
        }
      }
      &.active + ion-icon {
        z-index: 3;
        display: block;
        position: absolute;
        left: 2rem;
        top: 0;
        bottom: 0;
        margin-block: auto;
        .light & {
          color: rgb(var(--dark-color), 0.5);
        }
      }
    }
  }
`;

function Header() {
  const searchParams = useContext(SearchContext);
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const [menuOpen, setMenuOpen] = useState(false);
  let menuItems = ["Home", "About Us", "Contact Us"];
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
        <StyledHeader>
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
                <SearchBox
                  onSubmit={(e) => {
                    e.preventDefault();
                    navigate(
                      "/search/" + document.querySelector("#query").value
                    );
                  }}
                >
                  <input
                    type="text"
                    name="query"
                    id="query"
                    autoComplete="off"
                    placeholder="Search"
                    onChange={(e) => {
                      searchParams.setSearch(e.target.value);
                    }}
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
                  {!localStorage.getItem("token") ? (
                    <>
                      <Link to="/login">
                        <Button
                          className="secondary"
                          btnProperty="small secondary"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="primary" btnProperty="small primary">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <Button
                      className="primary"
                      btnProperty="small primary"
                      onClick={() => {
                        const host = "http://localhost:5000";
                        modalContext.setModal({
                          isOpen: true,
                          title: "Danger",
                          accent: "cross",
                          body: "Do you want to logout or delete account?",
                          footer: [
                            {
                              text: "Logout",
                              type: "accept",
                              accent: "danger",
                              action: () => {
                                localStorage.removeItem("token");
                                modalContext.setModal({
                                  ...modalContext.modal,
                                  isOpen: false,
                                });
                              },
                            },
                            {
                              text: "Delete Account",
                              type: "accept",
                              accent: "danger",
                              action: () => {
                                fetch(`${host}/api/users/deleteuser`, {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                    "auth-token": localStorage.getItem("token"),
                                  },
                                })
                                  .then(async (response) => {
                                    if (response.status === 200) {
                                      return response.json();
                                    } else {
                                      const err = (await response.json()).error;
                                      throw new Error(err);
                                    }
                                  })
                                  .then((data) => {
                                    localStorage.removeItem("token");
                                    modalContext.setModal({
                                      isOpen: true,
                                      title: "Success",
                                      accent: "tick",
                                      body: "Account Delete successful",
                                      footer: [
                                        {
                                          text: "Okay",
                                          type: "accept",
                                          accent: "success",
                                          action: () => {
                                            modalContext.setModal({
                                              ...modalContext.modal,
                                              isOpen: false,
                                            });
                                          },
                                        },
                                      ],
                                    });
                                    navigate("/");
                                  })
                                  .catch((err) => {
                                    modalContext.setModal({
                                      isOpen: true,
                                      title: "Error",
                                      accent: "cross",
                                      body: err.message,
                                      footer: [
                                        {
                                          text: "Okay",
                                          type: "accept",
                                          accent: "danger",
                                          action: () => {
                                            modalContext.setModal({
                                              ...modalContext.modal,
                                              isOpen: false,
                                            });
                                          },
                                        },
                                      ],
                                    }); // setModal
                                  });
                              },
                            },
                          ],
                        });
                        // localStorage.removeItem("token");
                        // window.location.reload();
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </RightHeader>
            </div>
          </div>
        </StyledHeader>
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
