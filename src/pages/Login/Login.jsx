import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button/Button";

const LoginDiv = styled.div`
  display: grid;
  place-items: center;
  height: calc(100vh - 4rem);
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
  return (
    <div className="container">
      <LoginDiv>
        <div className="login__container">
          <h1>Login to Movie108</h1>
          <form
            onSubmit={() => {
              navigate("/");
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
