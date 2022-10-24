import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  overflow-x: hidden;
  transition: all 0.5s ease;
  &:hover > .card {
    transition: all 0.5s ease;
    opacity: 0.8;
  }
  &:hover > .card:hover {
    transition: all 0.5s ease;
    opacity: 1;
  }
  .card {
    position: relative;
    border-radius: 0.25rem;
    overflow: hidden;
    /* display: grid; */
    display: flex;
    place-content: center;
    border: 1px solid rgba(var(--light-color), 0.15);
    transition: all 0.5s ease;
    .light & {
      border-color: rgba(var(--dark-color), 0.15);
    }
    & img {
      width: 100%;
      height: 400px;
      object-fit: cover;
      transition: all 0.5s ease;
    }
    &:hover img {
      transform: scale(1.1);
    }
    & .card-body {
      color: rgb(var(--light-color));
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
      bottom: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.5rem;
      flex-grow: 1;
    }
  }
`;

function CarouselCard({ movies }) {
  return (
    <div className="container">
      <Cards>
        {movies.length ? (
          movies.map((movie, index) => {
            const base64String = btoa(
              movie.image.data.data.reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
            return (
              <Link
                to={`/movie/${movie._id}`}
                key={index}
                className="card"
              >
                <img
                  src={`
                    data:image/png;base64,${base64String}
                  `}
                  alt={movie.title}
                />
                <div className="card-body">
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            );
          })
        ) : (
          <h2 style={{ textAlign: "center" }}>Not found</h2>
        )}
      </Cards>
    </div>
  );
}

export default CarouselCard;
