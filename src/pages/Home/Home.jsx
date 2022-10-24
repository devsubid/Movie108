import React, { useContext, useEffect } from "react";
import MovieContext from "../../context/movies/movieContext";
import Card from "./Card/Card";
import Carousel from "./CarouselSlider/CarouselSlider";

function Home() {
  const movies = useContext(MovieContext);
  useEffect(() => {
    movies.getMovies();
    // eslint-disable-next-line
  }, []);
  let arrMovies = movies.movies;
  return (
    <>
      <Carousel movies={arrMovies} />
      <Card movies={arrMovies} />
    </>
  );
}

export default Home;
