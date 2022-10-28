import MovieContext from "./movieContext";
import React, { useState } from "react";

const MovieState = (props) => {
  const host = process.env.REACT_APP_SERVER_HOST_URL;
  const [movies, setmovies] = useState([]);

  // Get all movies
  const getMovies = async () => {
    const response = await fetch(`${host}/api/movies/fetchmovies/pageno=1`);
    const json = await response.json();
    setmovies(json.movies);
    return json.totalPages;
  };

  // Get all movies and update
  const getMoviesUpdate = async (pageno) => {
    const response = await fetch(
      `${host}/api/movies/fetchmovies/pageno=${pageno}`
    );
    const json = await response.json();
    setmovies([...movies, ...json.movies]);
    return json.totalPages;
  };

  // search movies
  const searchMovies = async (text) => {
    const response = await fetch(`${host}/api/movies/searchmovies/${text}`);
    const status = response.status;
    if (status === 404) {
      setmovies([]);
    } else {
      const json = await response.json();
      setmovies(json);
    }
  };

  // Add Movie
  const addMovie = async (movie) => {
    setmovies([...movies, movie]);
    const response = await fetch(`${host}/api/movies/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0YzNmYjJkMjE1ZjEyZTRhYzQ1YTYyIn0sImlhdCI6MTY2NTk4MDk4Mn0.HF96zSH8AMfxOuFSMOFVsPwlh3lMvaQVKg-u5goK6F4",
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();
    console.log(data);
  };
  // Delete Movie
  const deleteMovie = async (id) => {
    setmovies(movies.filter((movie) => movie._id !== id));
    const response = await fetch(`${host}/api/movies/delete/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0YzNmYjJkMjE1ZjEyZTRhYzQ1YTYyIn0sImlhdCI6MTY2NTk4MDk4Mn0.HF96zSH8AMfxOuFSMOFVsPwlh3lMvaQVKg-u5goK6F4",
      },
    });
    const data = await response.json();
    console.log(data);
  };
  // Edit Movie
  const editMovie = async (movie) => {
    setmovies(
      movies.map((mov) => (mov._id === movie._id ? { ...mov, ...movie } : mov))
    );
    const response = await fetch(`${host}/api/movies/update/${movie._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0YzNmYjJkMjE1ZjEyZTRhYzQ1YTYyIn0sImlhdCI6MTY2NTk4MDk4Mn0.HF96zSH8AMfxOuFSMOFVsPwlh3lMvaQVKg-u5goK6F4",
      },
      body: JSON.stringify(movie),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        getMovies,
        getMoviesUpdate,
        searchMovies,
        addMovie,
        deleteMovie,
        editMovie,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
