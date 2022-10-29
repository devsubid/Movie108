import React, { useContext, useEffect } from "react";
import MovieContext from "./../../context/movies/movieContext";
import Card from "./../Home/Card/Card";
import { useParams } from "react-router-dom";
import loadingContext from "../../context/loading/loadingContext";

const Search = () => {
  const movies = useContext(MovieContext);
  const loading = useContext(loadingContext);
  const { params } = useParams();
  useEffect(() => {
    loading.setLoading(1);
    if (params !== "") {
      movies.searchMovies(params).then(() => {
        loading.setLoading(0);
      });
    } else {
      movies.getMovies();
    }
    // eslint-disable-next-line
  }, [params]);
  let arrMovies = movies.movies;
  return (
    <div className="container">
      <Card movies={arrMovies} />
    </div>
  );
};

export default Search;
