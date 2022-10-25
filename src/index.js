import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import MovieState from "./context/movies/MovieState";
import ModalState from "./context/modal/ModalState";
import LoadingState from "./context/loading/LoadingState";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MovieState>
      <ModalState>
        <LoadingState>
          <Router>
            <App />
          </Router>
        </LoadingState>
      </ModalState>
    </MovieState>
  </React.StrictMode>
);
