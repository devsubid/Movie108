import React, { useContext, useEffect } from "react";
import MovieContext from "./../../context/movies/movieContext";
import Card from "./../Home/Card/Card";
import { useParams } from "react-router-dom";
const Search = () => {
  const movies = useContext(MovieContext);
  const { params } = useParams();
  useEffect(() => {
    if (params !== "") {
      movies.searchMovies(params);
    } else {
      movies.getMovies();
    }
    // eslint-disable-next-line
  }, [params]);
  let arrMovies = movies.movies;
  return <Card movies={arrMovies} />;
};

export default Search;
