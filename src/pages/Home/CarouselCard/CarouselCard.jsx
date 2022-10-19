import React from "react";
import styled from "styled-components";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 1rem;
  overflow-x: hidden;
  & img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  .card {
    position: relative;
  }
  .card .card-body {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    bottom: 1rem;
  }
`;

function CarouselCard({ movies }) {
  return (
    <div className="container">
      <Cards>
        {movies.map((movie, index) => (
          <div className="card" key={index}>
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
