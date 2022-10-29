import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Modal from "../../../context/modal/modalContext";
import { useNavigate } from "react-router-dom";

const Stars = styled.div`
  padding-block: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 2.5rem;
  color: rgb(var(--light-color), 0.5);
  cursor: pointer;
  transform: rotateY(180deg);
  transition: all 0.15s ease;
  & input {
    display: none;
  }
  & label {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    transform: rotateY(180deg);
    transition: all 0.15s ease;
    .light & {
      color: rgb(var(--dark-color), 0.5);
    }
  }
  & input:not(:checked) ~ label:hover,
  & input:not(:checked) ~ label:hover ~ label {
    color: #ffa41c;
  }
  & input:checked ~ label {
    color: #ffa41c;
  }

  & .starText {
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgb(var(--light-color));
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 50%;
    p {
      margin: 0;
    }
    .light & {
      color: rgb(var(--dark-color));
    }
  }
`;

const StarRating = ({ movieId }) => {
  const modal = useContext(Modal);
  const navigate = useNavigate();
  const host = process.env.REACT_APP_SERVER_HOST_URL || "http://localhost:5000";
  let stars = [
    {
      id: 1,
      value: 1,
      text: "Horrible",
    },
    {
      id: 2,
      value: 2,
      text: "Bad",
    },
    {
      id: 3,
      value: 3,
      text: "Average",
    },
    {
      id: 4,
      value: 4,
      text: "Good",
    },
    {
      id: 5,
      value: 5,
      text: "Excellent",
    },
  ];
  useEffect(
    () => {
      localStorage.getItem("token") &&
        fetch(`${host}/api/rating/fetchuserrating/${movieId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        })
          .then((response) => response.json())
          .then(
            (data) =>
              data.rating.length &&
              (document.getElementById(data.rating[0].rating).checked = true)
          );
    } /* eslint-disable-next-line react-hooks/exhaustive-deps */,
    []
  );
  return (
    <Stars>
      {stars.reverse().map((star) => {
        return (
          <React.Fragment key={star.value}>
            <input
              type="radio"
              name="star"
              id={star.value}
              onClick={() => {
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
                  : fetch(`${host}/api/rating/add/${movieId}`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem("token"),
                      },
                      body: JSON.stringify({
                        rating: star.value,
                      }),
                    });
              }}
            />
            <label htmlFor={star.value}>
              <ion-icon name="star"></ion-icon>
              <div className="starText">
                <p>{star.text}</p>
              </div>
            </label>
          </React.Fragment>
        );
      })}
    </Stars>
  );
};

export default StarRating;
