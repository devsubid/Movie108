import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";

const CarouselStyle = styled.div`
  .carousel-item img {
    object-fit: contain;
  }
  .carousel-caption {
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
      <Carousel autoPlay centerMode infiniteLoop swipeable width="100%" statusFormatter={()=>{}} interval={1000}>
        {movies.map((movie, index) => (
          <div key={index}>
            <img
              className="d-block w-100"
              src={movie.image}
              alt="First slide"
            />
            <div className="carousel-caption">
              <h3>{movie.title}</h3>
              <p>{movie.fullTitle}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </CarouselStyle>
  );
}

export default IndividualIntervalsExample;
