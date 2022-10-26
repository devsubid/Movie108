import React, { useContext, useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import MovieContext from "./../../context/movies/movieContext";
import LoadingContext from "./../../context/loading/loadingContext";
import Card from "./Card/Card";
import Carousel from "./CarouselSlider/CarouselSlider";

const spinnerAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const ScrollLoading = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  margin-inline: auto;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  & span {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: calc(45% - 1.75rem);
    left: calc(50% - 1.75rem);
    border-radius: 50%;
    border-top: 4px solid rgba(var(--light-color), 1);
    border-left: 4px solid rgba(var(--light-color), 1);
    border-right: 4px solid rgba(var(--light-color), 0);
    animation: ${spinnerAnimation} 0.6s linear infinite;
  }
`;

function Home() {
  const isFirstRun = useRef(true);
  const movies = useContext(MovieContext);
  const loading = useContext(LoadingContext);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loadingScroll, setLoadingScroll] = useState(false);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (page < pages) {
        setLoadingScroll(true);
        setPage(page + 1);
        movies.getMovies(page + 1).then((pages) => {
          setLoadingScroll(false);
          setPages(pages);
        });
      }
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    if (isFirstRun.current) {
      loading.setLoading(1);
      movies.getMovies(page).then((pages) => {
        setPages(pages);
        loading.setLoading(0);
      });
      isFirstRun.current = false;
    }
    // eslint-disable-next-line
  }, [page, pages, movies, loading]);
  let arrMovies = movies.movies;
  return (
    <>
      {!loading.loading && arrMovies && (
        <>
          <Carousel movies={arrMovies && arrMovies.slice(0, 4)} />
          <Card movies={arrMovies} />
          {loadingScroll && (
            <ScrollLoading>
              <span></span>
            </ScrollLoading>
          )}
        </>
      )}
    </>
  );
}

export default Home;
