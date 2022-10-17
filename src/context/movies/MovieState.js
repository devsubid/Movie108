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
      image: "not required",
      __v: 0,
    },
    {
      _id: "634da23620bbdbf94169e7e9",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T18:24:21.564Z",
      image: "not required",
      __v: 0,
    },
    {
      _id: "634da23720bbdbf94169e7eb",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T18:24:21.564Z",
      image: "not required",
      __v: 0,
    },
    {
      _id: "634da23820bbdbf94169e7ed",
      user: "634c3fb2d215f12e4ac45a62",
      title: "test movie",
      fullTitle: "test movie for testing",
      year: "2022-10-17T18:24:21.564Z",
      image: "not required",
      __v: 0,
    },
  ];
  const [movies, setmovies] = useState(fetchMovies);
  return (
    <MovieContext.Provider value={movies}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
