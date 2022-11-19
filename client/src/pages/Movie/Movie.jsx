import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoadingContext from "../../context/loading/loadingContext";
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
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        transition: all 0.15s ease;
        & .movie--info-top-head {
          display: flex;
          gap: 0.5rem;
          & div {
            display: flex;
            align-items: center;
            font-size: 0.75rem;
            font-weight: 600;
            color: rgba(var(--light-color), 0.5);
            &:before {
              content: "•";
              margin-right: 0.5rem;
            }
          }
        }
        .light & {
          border-color: rgba(var(--dark-color), 0.15);
        }
        & .noRating {
          color: rgba(var(--light-color), 0.5);
          .light & {
            color: rgba(var(--dark-color), 0.5);
          }
        }
        & .breadcrumbs {
          display: flex;
          gap: 1rem;
          & .rating {
            width: calc(100% / 5.2);
            background: linear-gradient(
              to right,
              #ffa41c 0% ${(props) => props.rating * 20}%,
              rgb(var(--light-color), 0.5) ${(props) => props.rating * 20}% 100%
            );
            .light & {
              background: linear-gradient(
                to right,
                #ffa41c 0% ${(props) => props.rating * 20}%,
                rgb(var(--dark-color), 0.5) ${(props) => props.rating * 20}%
                  100%
              );
            }
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
      .light & {
        border-color: rgba(var(--dark-color), 0.15);
      }
      &--header {
        display: flex;
        &-name {
          font-weight: 600;
        }
        &-date {
          margin-left: auto;
          font-size: 0.8rem;
          color: rgba(var(--light-color), 0.5);
          .light & {
            color: rgba(var(--dark-color), 0.5);
          }
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
        @media screen and (max-width: 50rem) {
          width: 100%;
        }
      }
    }
  }
`;

const Movie = () => {
  const { movieId } = useParams();
  const host = process.env.REACT_APP_SERVER_HOST_URL || "http://localhost:5000";
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(null);
  const modal = useContext(modalContext);
  const navigate = useNavigate();
  const loading = useContext(LoadingContext);

  // get movie by id
  const getMovie = async (movieId) => {
    loading.setLoading(1);
    const response = await fetch(`${host}/api/movies/getmovie/${movieId}`);
    const status = response.status;
    loading.setLoading(0);
    if (status === 404 || status === 500) {
      setMovie(null);
      navigate("/404");
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
      setReviews(json.reverse());
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
  const dateFormater = (date) =>
    new Date() - new Date(date) < 86400000
      ? (new Date() - new Date(date)) / 3600000 < 1
        ? new Date() - new Date(date) < 60000
          ? "Just now"
          : `${Math.floor((new Date() - new Date(date)) / 60000)} minutes ago`
        : `${Math.floor((new Date() - new Date(date)) / 3600000)} hours ago`
      : new Date() - new Date(date) < 86400000
      ? "Today"
      : ~~((new Date() - new Date(date)) / 172800000) === 1
      ? "Yesterday"
      : ~~((new Date() - new Date(date)) / 172800000) < 7
      ? `${Math.floor((new Date() - new Date(date)) / 172800000)} days ago`
      : ~~((new Date() - new Date(date)) / 604800000) === 1
      ? "a week ago"
      : ~~((new Date() - new Date(date)) / 604800000) < 4
      ? `${Math.floor((new Date() - new Date(date)) / 604800000)} weeks ago`
      : ~~((new Date() - new Date(date)) / 2629746000) === 1
      ? "a month ago"
      : ~~((new Date() - new Date(date)) / 2629746000) < 12
      ? `${Math.floor((new Date() - new Date(date)) / 2629746000)} months ago`
      : ~~((new Date() - new Date(date)) / 31556952000) === 1
      ? "a year ago"
      : !!date
      ? `${new Date(date).getDate()}-${
          new Date(date).getMonth() + 1
        }-${new Date(date).getFullYear()}`
      : "N/A";
  useEffect(
    () => {
      loading.setLoading(1);
      let isCancelled = false;
      if (!isCancelled) {
        getMovie(movieId);
        getReviews(movieId);
        getRating(movieId);
        !localStorage.getItem("username") &&
          fetch(`${host}/api/users/getusername`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then(
              (data) => data.name && localStorage.setItem("username", data.name)
            );
      }
      return () => {
        isCancelled = true;
      };
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
    <MovieDiv rating={rating?.avgRating[0]?.avgRating}>
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
                <div className="movie--info-top-head">
                  <h2>{movie.title}</h2>
                  <div>{dateFormater(movie.date)}</div>
                </div>
                {rating?.avgRating.length ? (
                  <div className="breadcrumbs">
                    <div
                      className="rating"
                      title={`${rating.avgRating[0].avgRating} Stars`}
                    ></div>
                    <div className="ratingCount">{rating.rating} ratings</div>
                  </div>
                ) : (
                  <div className="noRating">No ratings yet</div>
                )}
              </div>
              <div className="movie--info-description">
                <p>{movie.description}</p>
              </div>
            </div>
          </div>
        )}
        <div className="reviews">
          <h3>{reviews?.length} Reviews</h3>
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
                        e.target.reset();
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
            reviews.map((review) => {
              return (
                <div className="review" key={review._id}>
                  <div className="review--header">
                    <div className="review--header-name">
                      {localStorage.getItem("username") === review.userName
                        ? "You"
                        : review.userName}
                    </div>
                    <div className="review--header-date">
                      {dateFormater(review.date)}
                    </div>
                  </div>
                  <div className="review--body">
                    <p>{review.review}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </MovieDiv>
  );
};

export default Movie;
