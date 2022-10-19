import MovieContext from "./movieContext";
import React, { useState } from "react";

const MovieState = (props) => {
  const fetchMovies = [
    {
      _id: "634cf878eff2997eb506fba9",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T06:37:11.458Z",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjEwNjlmMzQtZmNjNS00MWY3LTg3ZGUtNGMyM2NkN2JiOTc4XkEyXkFqcGdeQWthc2hpa2F4._CR217,122,1494,840_QL75_UY563_CR0,0,1000,563_.jpg",
      __v: 0,
    },
    {
      _id: "634da23620bbdbf94169e7e9",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T18:24:21.564Z",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjZkNTgwZTItYjY5MC00ZDRiLTlkYjktNzM3NjYzZWY1NjFhXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._CR95,198,3062,1722_QL75_UY281_CR0,0,500,281_.jpg",
      __v: 0,
    },
    {
      _id: "634da23720bbdbf94169e7eb",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T18:24:21.564Z",
      image:
        "https://m.media-amazon.com/images/M/MV5BNjEwNjlmMzQtZmNjNS00MWY3LTg3ZGUtNGMyM2NkN2JiOTc4XkEyXkFqcGdeQWthc2hpa2F4._CR217,122,1494,840_QL75_UY563_CR0,0,1000,563_.jpg",
      __v: 0,
    },
    {
      _id: "634da23820bbdbf94169e7ed",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T18:24:21.564Z",
      image:
        "https://m.media-amazon.com/images/M/MV5BZjZkNTgwZTItYjY5MC00ZDRiLTlkYjktNzM3NjYzZWY1NjFhXkEyXkFqcGdeQXVyNjY1MTg4Mzc@._CR95,198,3062,1722_QL75_UY281_CR0,0,500,281_.jpg",
      __v: 0,
    },
  ];
  const [movies, setmovies] = useState(fetchMovies);
  // Add Movie
  const addMovie = (movie) => {
    setmovies([...movies, movie]);
  };
  // Delete Movie
  const deleteMovie = (id) => {
    setmovies(movies.filter((movie) => movie._id !== id));
  };
  // Edit Movie
  const editMovie = (movie) => {
    setmovies(
      movies.map((mov) => (mov._id === movie._id ? { ...mov, ...movie } : mov))
    );
  };
  return (
    <MovieContext.Provider value={movies}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
