import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";
import ModalContext from "./../../context/modal/modalContext";

const LoginDiv = styled.div`
  display: grid;
  place-items: center;
  & .login__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 2rem;
    border-radius: 10px;
    border: 1px solid rgb(var(--primary-color), 0.5);
    box-shadow: 0 0 20px rgb(var(--primary-color), 0.5);
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
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const modalContext = useContext(ModalContext);
  return (
    <div className="container">
      <LoginDiv>
        <div className="login__container">
          <h1>Login to Movie108</h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const host = "http://localhost:5000";
              fetch(`${host}/api/users/login`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: e.target.email.value,
                  password: e.target.password.value,
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
                    body: "Login successful",
                    footer: [
                      {
                        text: "Okay",
                        type: "accept",
                        accent: "info",
                        action: () => {
                          modalContext.setModal({
                            ...modalContext.modal,
                            isOpen: false,
                          });
                        },
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
                        type: "accept",
                        accent: "danger",
                        action: () => {
                          modalContext.setModal({
                            ...modalContext.modal,
                            isOpen: false,
                          });
                        },
                      },
                    ],
                  }); // setModal
                });
            }}
          >
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
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
                type="password"
                placeholder="Enter your password..."
                id="password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                autoComplete="on"
                required
              />
            </div>
            <div className="button__container">
              <Button className="primary" btnProperty="primary" type="submit">
                Login
              </Button>
              <Link to="/signup">
                <span>Register New User</span>
              </Link>
            </div>
          </form>
        </div>
      </LoginDiv>
    </div>
  );
}

export default Login;
