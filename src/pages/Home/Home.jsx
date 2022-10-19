import React, { useContext } from "react";
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
  return (
    <>
      <Carousel movies={movies} />
      <CarouselCard movies={movies} />
    </>
  );
}

export default Home;
