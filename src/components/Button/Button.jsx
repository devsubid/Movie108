import "./Button.css";
import styled from "styled-components";

const Button = styled.button`
  padding: 0.85rem 1.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  background-color: transparent;
  color: rgb(var(--dark-color));
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
`;

export default Button;
