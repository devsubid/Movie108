import MovieContext from "./movieContext";
import React, { useState } from "react";

const MovieState = (props) => {
  const host = "http://localhost:5000";
  const fetchMovies = [];
  const [movies, setmovies] = useState(fetchMovies);

  // Get all movies
  const getMovies = async () => {
    const response = await fetch(`${host}/api/movies/fetchmovies`);
    const json = await response.json();
    console.log(json);
    setmovies(json);
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
    <MovieContext.Provider value={{ movies, getMovies }}>
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieState;
