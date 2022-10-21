import React, { useContext, useEffect } from "react";
import MovieContext from "../../context/movies/movieContext";
import CarouselCard from "./CarouselCard/CarouselCard";
import Carousel from "./CarouselSlider/CarouselSlider";

function Home() {
  // fetch("http://localhost:5000/api/movies/fetchmovies", {
  //   method: "GET",
  //   mode: "no-cors",
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  const movies = useContext(MovieContext);
  useEffect(() => {
    movies.getMovies();
  }, []);
  let arrMovies = movies.movies;
  return (
    <>
      <Carousel movies={arrMovies} />
      <CarouselCard movies={arrMovies} />
    </>
  );
}

export default Home;
