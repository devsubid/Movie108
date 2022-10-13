import "./Login.css";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Movie108 | Login";
  }, []);
  return (
    <div className="container">
      <div className="login">
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
                required
              />
            </div>
            <div className="button__container">
              <Button className="primary" type="submit">
                Login
              </Button>
              <Link to="/signup">
                <span>Register New User</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
