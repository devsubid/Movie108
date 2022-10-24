import React, { useContext, useEffect } from "react";
import MovieContext from "./../../context/movies/movieContext";
import SearchContext from "./../../context/searchParams/searchContext";
import Card from "./../Home/Card/Card";
const Search = () => {
  const movies = useContext(MovieContext);
  const searchParams = useContext(SearchContext);
  useEffect(() => {
    if (searchParams.search !== "") {
      movies.searchMovies(searchParams.search);
    } else {
      movies.getMovies();
    }
    // eslint-disable-next-line
  }, [searchParams.search]);
  let arrMovies = movies.movies;
  return <Card movies={arrMovies} />;
};

export default Search;
