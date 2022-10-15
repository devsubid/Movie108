import "./App.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import NotFound from "./pages/NotFound/NotFound";

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
