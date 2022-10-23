import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import ModalContext from "./../../context/modal/modalContext";

const SignUpDiv = styled.div`
  display: grid;
  place-items: center;
  & .signUp__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem;
    border: 1px solid rgba(var(--primary-color), 0.5);
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(var(--primary-color), 0.5);
    & h1 {
      align-self: flex-start;
      margin-bottom: 20px;
      font-size: 2rem;
      font-weight: 700;
      border-left: 0.5rem solid rgb(var(--primary-color));
      padding-left: 0.625rem;
    }
    & form {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1rem;
      padding-block: 1rem;
      width: 100%;
      & button {
        white-space: nowrap;
      }
    }
  }
`;

function SignUp() {
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  const [status, setStatus] = useState("");
  const confirmPassword = () => {
    let password = document.getElementById("password").value;
    let cPassword = document.getElementById("confirmPassword").value;
    if (password !== cPassword) {
      setStatus("Passwords do not match");
      return false;
    } else {
      setStatus("Passwords match");
      return true;
    }
  };
  return (
    <div className="container">
      <SignUpDiv>
        <div className="signUp__container">
          <h1>SignUp to Movie108</h1>
          <form
            id="signUp__form"
            onSubmit={(e) => {
              e.preventDefault();
              if (confirmPassword()) {
                const host = "http://localhost:5000";
                fetch(`${host}/api/users/signup`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: e.target.name.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                    confirmPassword: e.target.confirmPassword.value,
                  }),
                })
                  .then(async (response) => {
                    if (response.status === 400) {
                      const err = (await response.json()).error;
                      throw new Error(err);
                    } else {
                      return response.json();
                    }
                  })
                  .then((data) => {
                    localStorage.setItem("token", data.authToken);
                    modalContext.setModal({
                      isOpen: true,
                      title: "Success",
                      accent: "tick",
                      body: "Sign Up successful",
                      footer: [
                        {
                          text: "Okay",
                          type: "close",
                          accent: "info",
                        },
                      ],
                    });
                    navigate("/");
                  })
                  .catch((err) => {
                    modalContext.setModal({
                      isOpen: true,
                      title: "Error",
                      accent: "cross",
                      body: err.message,
                      footer: [
                        {
                          text: "Okay",
                          type: "close",
                          accent: "danger",
                        },
                      ],
                    }); // setModal
                  });
              }
            }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                autoComplete="on"
                type="text"
                placeholder="Enter your Name..."
                name="name"
                id="name"
                pattern="[A-Za-z ]{3,}"
                title="Please enter at least 3 characters"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                autoComplete="on"
                type="email"
                placeholder="Enter your email..."
                id="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                title="Please enter a valid email address"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                autoComplete="on"
                type="password"
                placeholder="Enter your password..."
                id="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                onKeyUp={confirmPassword}
                autoComplete="off"
                type="password"
                placeholder="Confirm your Password..."
                id="confirmPassword"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                required
              />
              <span
                id="status"
                style={{
                  color: `${
                    status === ""
                      ? ""
                      : status === "Passwords do not match"
                      ? "red"
                      : "green"
                  }`,
                }}
              >
                {status}
              </span>
            </div>
            <div className="button__container">
              <Button className="primary" btnProperty="primary" type="submit">
                Sign Up
              </Button>
              <Link to="/login">
                <span>Already Have an Account</span>
              </Link>
            </div>
          </form>
        </div>
      </SignUpDiv>
    </div>
  );
}

export default SignUp;
