import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CarouselStyle = styled.div`
  & .slide {
    cursor: pointer;
  }
  & .thumbs {
    display: flex;
    justify-content: center;
  }
  & .thumb {
    border-radius: 0.25rem;
    border-color: rgb(var(--light-color), 0.5);
    width: 8rem !important;
    height: 5rem;
    display: grid;
    place-content: center;
    & img {
      width: 8rem !important;
      height: 5rem;
      object-fit: cover;
      object-position: top;
    }
    @media screen and (max-width: 50rem) {
      width: 5rem !important;
      height: 3rem;
      & img {
        width: 5rem !important;
        height: 3rem;
      }
    }
    &:hover {
      border-color: rgb(var(--light-color), 0.25);
    }
    &.selected {
      border-color: rgb(var(--light-color));
    }
    .light & {
      border-color: rgb(var(--dark-color), 0.5);
      &:hover {
        border-color: rgb(var(--dark-color), 0.25);
      }
      &.selected {
        border-color: rgb(var(--dark-color));
      }
    }
  }
  & img {
    height: 25rem;
    width: auto;
    overflow: hidden;
    object-fit: cover;
    object-position: top;
  }
  & .carousel-caption {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    z-index: 1;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: #fff;
  }
`;

function IndividualIntervalsExample({ movies }) {
  const navigate = useNavigate();
  return (
    <CarouselStyle className="container">
      <Carousel
        autoPlay
        centerMode
        infiniteLoop
        swipeable
        width="100%"
        showArrows={true}
        showThumbs={true}
        interval={2000}
        statusFormatter={() => {}}
      >
        {movies.map((movie, index) => {
          const base64String = btoa(
            movie.image.data.data.reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
          return (
            <div
              key={index}
              onClick={() => {
                navigate(`/movie/${movie.title}-${movie._id}`);
              }}
            >
              <img
                src={`data:image/png;base64,${base64String}`}
                alt={movie.title}
              />
              <div className="carousel-caption">
                <h3>{movie.title}</h3>
              </div>
            </div>
          );
        })}
      </Carousel>
    </CarouselStyle>
  );
}

export default IndividualIntervalsExample;
