import "./Home.css";
import React, { useEffect } from "react";
import Header from "./../../components/Header/Header"

function Home() {
  useEffect(() => {
    document.title = "Movie108 | Home";
  }, []);
  return (
    <div className="container">
      <div className="home">
        <div className="home__container">
          <Header />
        </div>
      </div>
    </div>
  );
}

export default Home;
