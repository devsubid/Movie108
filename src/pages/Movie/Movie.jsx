import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import star from "./../../assets/rating.png";
import Button from "./../../components/Button/Button";
import modalContext from "./../../context/modal/modalContext";
import StarRating from "./StarRating/StarRating";

const MovieDiv = styled.div`
  & .movie--container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 1rem;
    & .movie--image {
      width: 100%;
      height: 100%;
      img {
        width: 100%;
        /* height: 100%;  */
        object-fit: contain;
      }
    }
    & .movie--info {
      padding: 0 1rem;
      h1 {
        font-size: 2rem;
        font-weight: 600;
      }
      & .movie--info-top {
        border-bottom: 1px solid rgba(var(--light-color), 0.15);
        padding-bottom: 1rem;
        .breadcrumbs {
          display: flex;
          gap: 1rem;
          & .rating {
            width: calc(100% / 5.2);
            background: linear-gradient(
              to right,
              #ffa41c 0% ${(props) => props.rating * 20}%,
              rgb(var(--light-color)) ${(props) => props.rating * 20}% 100%
            );
            mask: url(${star}) no-repeat left;
            mask-size: contain;
            cursor: pointer;
          }
        }
      }
      & .movie--info-description {
        padding-block: 1rem;
      }
    }
  }
  & .reviews {
    margin-top: 2rem;
    & h2 {
      font-size: 1.5rem;
      font-weight: 600;
    }
    & .review {
      margin-top: 1rem;
      padding: 1rem;
      border: 1px solid rgba(var(--light-color), 0.15);
      border-radius: 0.5rem;
      &--header {
        display: flex;
        &-name {
          font-weight: 600;
        }
        &-date {
          margin-left: auto;
          font-size: 0.8rem;
          color: rgba(var(--light-color), 0.5);
        }
      }
      &--body {
        margin-top: 1rem;
      }
    }
    & form {
      display: flex;
      flex-direction: column;
      width: 100%;
      & textarea {
        width: 100%;
        height: 100px;
        resize: vertical;
        padding: 0.5rem;
        margin-block: 0.5rem;
        border: 1px solid rgba(var(--light-color), 0.15);
        border-radius: 0.5rem;
        outline: none;
        background: transparent;
        color: rgb(var(--light-color));
        border: 1px solid rgb(var(--light-color), 0.3);
        caret-color: rgb(var(--light-color));
        font-size: 1rem;
        &::placeholder {
          color: rgba(var(--light-color), 0.5);
        }
        .light & {
          color: rgb(var(--dark-color));
          border: 1px solid rgb(var(--dark-color), 0.3);
          caret-color: rgb(var(--dark-color));
        }
        .light &::placeholder {
          color: rgb(var(--dark-color));
        }
      }
      & button {
        margin-left: auto;
      }
    }
  }
`;

const Movie = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const modal = useContext(modalContext);
  const navigate = useNavigate();
  const host = process.env.REACT_APP_SERVER_HOST_URL;
  // get movie by id
  const getMovie = async (movieId) => {
    const response = await fetch(`${host}/api/movies/getmovie/${movieId}`);
    const status = response.status;
    if (status === 404 || status === 500) {
      setMovie(null);
    } else {
      const json = await response.json();
      setMovie(json);
    }
  };
  const getReviews = async (movieId) => {
    const response = await fetch(`${host}/api/review/fetchreviews/${movieId}`);
    const status = response.status;
    if (status === 404 || status === 500) {
      setReviews(null);
    } else {
      const json = await response.json();
      setReviews(json);
    }
  };
  const getRating = async (movieId) => {
    const response = await fetch(`${host}/api/rating/fetchrating/${movieId}`);
    const status = response.status;
    if (status === 404 || status === 500) {
      setRating(null);
    } else {
      const json = await response.json();
      // setMovie((prev) => ({ ...prev, rating: json.rating }));
      setRating(json);
    }
  };
  useEffect(
    () => {
      getMovie(movieId);
      getReviews(movieId);
      getRating(movieId);
    } /* eslint-disable-next-line react-hooks/exhaustive-deps */,
    []
  );
  document.title = `${movie?.title} | Movie108`;
  let base64String;
  movie &&
    (base64String = btoa(
      movie.image.data.data.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ""
      )
    ));
  return (
    <MovieDiv rating={rating && rating.avgRating[0].avgRating}>
      <div className="container">
        {movie && (
          <div className="movie--container">
            <div className="movie--image">
              <img
                src={`
                data:image/png;base64,${base64String} 
              `}
                alt={movie.title}
              />
            </div>
            <div className="movie--info">
              <div className="movie--info-top">
                <h1>{movie.title}</h1>
                <div className="breadcrumbs">
                  <div
                    className="rating"
                    title={`${rating && rating.avgRating[0].avgRating} Stars`}
                  ></div>
                  <div className="ratingCount">{rating.rating} ratings</div>
                </div>
              </div>
              <div className="movie--info-description">
                <p>{movie.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className="reviews">
          <h3>{reviews && reviews.length} Reviews</h3>
          {/* Add review section here */}
          <div className="add-review">
            <div className="starRating">
              <div className="starRating--heading">
                <h3>Rate this movie</h3>
              </div>
              <div className="starRating--stars">
                <StarRating movieId={movieId} />
              </div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                !localStorage.getItem("token")
                  ? modal.setModal({
                      isOpen: true,
                      title: "Error",
                      accent: "cross",
                      body: "Please login/signup to add a review",
                      footer: [
                        {
                          text: "Login",
                          type: "accept",
                          accent: "info",
                          action: () => {
                            navigate("/login");
                            modal.setModal({
                              ...modal.modal,
                              isOpen: false,
                            });
                          },
                        },
                        {
                          text: "Sign Up",
                          type: "accept",
                          accent: "info",
                          action: () => {
                            navigate("/signup");
                            modal.setModal({
                              ...modal.modal,
                              isOpen: false,
                            });
                          },
                        },
                      ],
                    }) // setModal
                  : fetch(`${host}/api/review/add/${movieId}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                      },
                      body: JSON.stringify({
                        review: e.target.review.value,
                      }),
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        getReviews(movieId);
                      });
              }}
            >
              <div className="form-group">
                <textarea
                  className="form-control"
                  name="review"
                  id="review"
                  rows="3"
                  placeholder="Write a review"
                  required
                ></textarea>
              </div>
              <Button
                className="primary"
                btnProperty="small primary"
                type="submit"
              >
                Review
              </Button>
            </form>
          </div>
          {reviews &&
            reviews.map((review) => (
              <div className="review" key={review._id}>
                <div className="review--header">
                  <div className="review--header-name">{review.userName}</div>
                  <div className="review--header-date">
                    {new Date(-new Date(review.date)) < 86400000
                      ? (new Date() - new Date(review.date)) / 3600000 < 1
                        ? `${Math.floor(
                            (new Date() - new Date(review.date)) / 60000
                          )} minutes ago`
                        : `${Math.floor(
                            (new Date() - new Date(review.date)) / 3600000
                          )} hours ago`
                      : new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="review--body">
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </MovieDiv>
  );
};

export default Movie;
