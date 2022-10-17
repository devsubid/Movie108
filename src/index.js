import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import MovieState from "./context/movies/MovieState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MovieState>
      <Router>
        <App />
      </Router>
    </MovieState>
  </React.StrictMode>
);
