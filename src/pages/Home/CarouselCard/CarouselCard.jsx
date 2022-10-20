import React from "react";
import styled from "styled-components";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  overflow-x: hidden;
  .card {
    position: relative;
    border-radius: 0.25rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(var(--light-color), 0.15);
    transition: all 0.15s ease;
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
        {movies.map((movie, index) => (
          <div
            className="card"
            key={index}
            style={{ width: "100%", height: "200px" }}
          >
            <img src={movie.image} alt={movie.title} />
            <div className="card-body">
              <h3>{movie.title}</h3>
              <p>{movie.fullTitle}</p>
            </div>
          </div>
        ))}
      </Cards>
    </div>
  );
}

export default CarouselCard;
