import "./Button.css";
import styled from "styled-components";

const Button = styled.button`
  ${(props) =>
    /small/.test(props.btnProperty)
      ? "padding: 0.5rem 1rem; font-size: 1rem"
      : "padding:  1rem 2rem; font-size: 1.25rem"};
  font-weight: 500;
  line-height: 1.5;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  ${(props) =>
    /primary/.test(props.btnProperty)
      ? "background-color: rgb(var(--light-color)); color: rgb(var(--dark-color));}"
      : "background-color: transparent; color: rgb(var(--dark-color));"};
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
`;

export default Button;
