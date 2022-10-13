import "./SignUp.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";

function SignUp() {
  const navigate = useNavigate();
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
  const SignUpSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword()) {
      navigate("/");
    }
  };
  useEffect(() => {
    document.title = "Movie108 | Sign Up";
  }, []);

  return (
    <div className="container">
      <div className="signUp">
        <div className="signUp__container">
          <h1>SignUp to Movie108</h1>
          <form id="signUp__form" onSubmit={SignUpSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                autoComplete="false"
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
                autoComplete="false"
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
                autoComplete="false"
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
                autoComplete="false"
                type="password"
                placeholder="Enter your Confirm Password..."
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
      </div>
    </div>
  );
}

export default SignUp;
