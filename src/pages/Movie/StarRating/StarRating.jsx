import React, { useContext } from "react";
import styled from "styled-components";
import star from "./../../../assets/star.svg";
import Modal from "../../../context/modal/modalContext";
import { useNavigate } from "react-router-dom";

const Stars = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;
  & .star--container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    & .star {
      width: 2.5rem;
      height: 2.5rem;
      background: green;
      mask: url(${star}) no-repeat left;
      mask-size: contain;
      cursor: pointer;
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
  }
`;

const StarRating = ({ movieId }) => {
  const modal = useContext(Modal);
  const navigate = useNavigate();
  const host = process.env.REACT_APP_SERVER_HOST_URL;
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
  return (
    <Stars>
      {stars.map((star) => {
        return (
          <div
            key={star.id}
            className="star--container"
            style={{ "--text": `${star.text}` }}
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
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                    });
            }}
          >
            <div className="star" style={{ background: star.color }}></div>
            <div className="starText">
              <p>{star.text}</p>
            </div>
          </div>
        );
      })}
    </Stars>
  );
};

export default StarRating;
