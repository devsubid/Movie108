import React, { Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";

// lazy load all components
const Login = React.lazy(() => import("./pages/Login/Login"));
const SignUp = React.lazy(() => import("./pages/SignUp/SignUp"));
const Home = React.lazy(() => import("./pages/Home/Home"));
const Modal = React.lazy(() => import("./components/Modal/Modal"));
const Search = React.lazy(() => import("./pages/Search/Search"));
const Movie = React.lazy(() => import("./pages/Movie/Movie"));
const About = React.lazy(() => import("./pages/About/About"));
const Contact = React.lazy(() => import("./pages/Contact/Contact"));

const GlobalStyle = createGlobalStyle`
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
  width: min(90%, 70rem);
  padding-block: 1rem;
  margin-top: 4.5rem;
  @media screen and (min-width: 50rem) {
    & {
      margin-top: 5rem;
    }
  }
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
.light ::selection {
  color: rgb(var(--light-color));
  background: rgb(var(--primary-color));
}
a {
  text-decoration: none;
  color: inherit;
}
a:hover{
  text-decoration: underline;
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
  border: 1px solid rgb(var(--light-color), 0.3);
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
.form-group textarea {
  width: 100%;
  outline: none;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgb(255 255 255 / 30%);
  background-color: transparent;
  color: rgb(var(--light-color));
  font-size: 1.15em;
  font-weight: 300;
}
.form-group textarea:focus {
  border: 1px solid rgb(var(--primary-color));
}
.form-group textarea::placeholder {
  color: rgb(var(--light-color));
  opacity: 0.5;
  transition: all 0.15 ease;
}
.light .form-group input {
  color: rgb(var(--dark-color));
  border: 1px solid rgb(var(--dark-color), 0.3);
  caret-color: rgb(var(--dark-color));
}
.light .form-group textarea {
  color: rgb(var(--dark-color));
  border: 1px solid rgb(var(--dark-color), 0.3);
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

const spinnerAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const ScrollLoading = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  & span {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: calc(45% - 1.75rem);
    left: calc(50% - 1.75rem);
    border-radius: 50%;
    border-top: 4px solid rgba(var(--light-color), 1);
    border-left: 4px solid rgba(var(--light-color), 1);
    border-right: 4px solid rgba(var(--light-color), 0);
    animation: ${spinnerAnimation} 0.6s linear infinite;
  }
`;

function App() {
  const location = useLocation();
  useEffect(() => {
    localStorage.getItem("mode") === "light" &&
      document.body.classList.add("light");
    console.clear();
    console.log(
      "%citsme-subid",
      "font-family: sans-serif; font-weight: 700; color: #1f6feb; padding-block: 2rem; font-size: 2.5rem; text-transform: uppercase;"
    );
    console.log(
      "%cStop!",
      "font-family: sans-serif; font-weight: 700; color: red; font-size: 5rem; text-transform: uppercase;"
    );
    console.log(
      `%cThis is a browser feature intended for developers. If someone told you to copy and paste something here to enable a Movie108 feature or "hack" the server or database, it is a scam and will give them access to your account.`,
      `font-size: 1.2rem; font-family: sans-serif; color: #fff`
    );
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
      <Modal />
      <Loading />
      <Suspense
        fallback={
          <ScrollLoading>
            <span></span>
          </ScrollLoading>
        }
      >
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/aboutus" element={<About />} />
          <Route exact path="/contactus" element={<Contact />} />
          <Route path="/movie/:movieTitle-:movieId" element={<Movie />} />
          <Route path="/search/:params" element={<Search />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
