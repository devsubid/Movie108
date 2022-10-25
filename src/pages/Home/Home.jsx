import React, { useContext, useEffect, useState, useRef } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
import MovieContext from "./../../context/movies/movieContext";
import LoadingContext from "./../../context/loading/loadingContext";
import Card from "./Card/Card";
import Carousel from "./CarouselSlider/CarouselSlider";

function Home() {
  const movies = useContext(MovieContext);
  const loading = useContext(LoadingContext);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      loading.setLoading(1);
      movies.getMovies(page).then((pages) => {
        console.log(pages);
        setPages(pages);
        loading.setLoading(0);
      });
      isFirstRun.current = false;
    }
    // eslint-disable-next-line
  }, []);
  let arrMovies = movies.movies;
  console.log(arrMovies);
  return (
    <>
      {!loading.loading && arrMovies && (
        <>
          <Carousel movies={arrMovies && arrMovies.slice(0, 4)} />
          {/* <InfiniteScroll
            dataLength={arrMovies.length}
            next={movies.getMovies(page <= pages && page + 1)}
            hasMore={() => {
              const hasMore = page <= pages;
              setPage(page + 1);
              return hasMore;
            }}
            loader={<h4>Loading...</h4>}
          > */}
            <Card movies={arrMovies} />
          {/* </InfiniteScroll> */}
        </>
      )}
    </>
  );
}

export default Home;
