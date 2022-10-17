import React, { useContext } from "react";
import MovieContext from "../../context/movies/movieContext";

function Home() {
  // fetch("http://localhost:5000/api/movies/fetchmovies", {
  //   method: "GET",
  //   mode: "no-cors",
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  const movies = useContext(MovieContext);
  console.log(new Date(movies[0].year).getFullYear());
  return (
    <div className="container">
      <div className="home">
        <div className="home__container">
          {movies.map((movie, index) => (
            <div className="home__movie" key={index}>
              <img src={movie.image} alt="" />
              <div className="home__movie__info">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>year: {new Date(movie.year).getFullYear()}</p>
                {movie.rating && <p>rating: {movie.rating}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
