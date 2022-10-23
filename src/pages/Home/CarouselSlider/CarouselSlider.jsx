import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

const CarouselStyle = styled.div`
  & .thumbs {
    display: flex;
    justify-content: center;
  }
  & .thumb {
    border-radius: 0.25rem;
  }
  & .imgContainer {
    height: 25rem;
    width: auto;
    overflow: hidden;
  }
  & .carousel .slide img {
    width: 100%;
    object-fit: contain;
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
  return (
    <CarouselStyle className="container">
      <Carousel
        autoPlay
        centerMode
        infiniteLoop
        swipeable
        width="100%"
        showArrows={false}
        showThumbs={false}
        interval={2000}
        statusFormatter={() => {}}
      >
        {movies.map((movie, index) => {
          // const base64String = btoa(
          //   String.fromCharCode(...new Uint8Array(movie.image.data.data))
          // );
          return (
            <div key={index}>
              <div className="imgContainer">
                <img
                  // src={`data:image/jpg;base64,${base64String}`}
                  alt={movie.title}
                />
              </div>
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
