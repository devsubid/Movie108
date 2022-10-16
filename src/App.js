import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound/NotFound";

const GlobalStyle = createGlobalStyle`
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
:root {
  --light-color: 240, 246, 252;
  --dark-color: 13, 17, 23;
  --primary-color: 31, 111, 235;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
  outline: none;
}
body {
  background-color: rgb(var(--dark-color));
  color: rgb(var(--light-color));
  overflow-x: hidden;
  scroll-behavior: smooth;
  transition: all 0.15s ease;
}
.container {
  margin-inline: auto;
  width: min(90%, 50rem);
  padding-block: 2rem;
}
.light {
  background-color: rgb(var(--light-color));
  color: rgb(var(--dark-color));
}
::-webkit-scrollbar {
  width: 0.25em;
}
::-webkit-scrollbar-track {
  margin-block: 0.45em;
  transition: all 0.15s ease;
}
::-webkit-scrollbar-track:hover {
  background: rgba(var(--dark-color), 0.1);
}
::-webkit-scrollbar-thumb {
  background: rgba(var(--light-color), 0.5);
  border-radius: 0.5rem;
}
.light ::-webkit-scrollbar-thumb {
  background: rgb(var(--dark-color), 0.5);
}
a {
  text-decoration: none;
  color: inherit;
}
.form-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
}
.form-group label {
  font-size: 1.15em;
  font-weight: 500;
}
.form-group input {
  width: 100%;
  outline: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(255 255 255 / 30%);
  background-color: transparent;
  color: rgb(var(--light-color));
  font-size: 1.15em;
  font-weight: 300;
  transition: all 0.15 ease;
}
.form-group input:focus {
  border: 1px solid rgb(var(--primary-color));
}
.form-group input::placeholder {
  color: rgb(var(--light-color));
  opacity: 0.5;
  transition: all 0.15 ease;
}
.light .form-group input {
  color: rgb(var(--dark-color));
  border: 1px solid rgb(0 0 0 / 30%);
  caret-color: rgb(var(--dark-color));
}
.light .form-group textarea {
  color: rgb(var(--dark-color));
  border: 1px solid rgb(0 0 0 / 30%);
  caret-color: rgb(var(--dark-color));
}
.light .form-group input::placeholder {
  color: rgb(var(--dark-color));
}
.light .form-group textarea::placeholder {
  color: rgb(var(--dark-color));
}
label {
  display: inline-block;
}
.label_faded {
  opacity: 0.5;
}
.button__container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
:is(.login__container, .signUp__container) .button__container  a {
  align-self: flex-end;
  color: rgb(var(--primary-color));
  text-decoration: none;
  text-align: right;
}
:is(.login__container, .signUp__container) .button__container  a:hover {
  text-decoration: underline;
  text-align: right;
}
`;

function App() {
  const location = useLocation();
  useEffect(() => {
    localStorage.getItem("mode") === "light" &&
      document.body.classList.add("light");
    if (location.pathname === "/") {
      document.title = "Home | Movie108";
    } else {
      let pathname =
        location.pathname.slice(1).charAt(0).toUpperCase() +
        location.pathname.slice(2);
      document.title = pathname + " | Movie108";
    }
  }, [location]);
  return (
    <div className="App">
      <GlobalStyle />
      <Header />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
