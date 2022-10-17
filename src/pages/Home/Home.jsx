import React from "react";

function Home() {
  fetch("http://localhost:5000/api/movies/fetchmovies", {
    method: "GET",
    mode: "no-cors",
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
  return (
    <div className="container">
      <div className="home">
        <div className="home__container"></div>
      </div>
    </div>
  );
}

export default Home;
