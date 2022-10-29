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
  &.large {
    padding: 1.25rem 2rem;
    font-size: 1.5rem;
  }
  &:hover {
    background-color: transparent;
    color: rgb(var(--light-color));
    border-color: rgb(var(--light-color));
    box-shadow: rgba(var(--light-color), 0.3) 0px 12px 25px 0px;
  }
  &.secondary {
    background-color: transparent;
    color: rgb(var(--light-color));
    border-color: rgb(var(--light-color));
  }
  &.secondary:hover {
    background-color: rgb(var(--light-color));
    color: rgb(var(--dark-color));
  }
  .light &:hover {
    border-color: rgb(var(--dark-color));
    box-shadow: rgba(var(--dark-color), 0.3) 0px 12px 25px 0px;
  }
  .light &.secondary {
    background-color: transparent;
    color: rgb(var(--dark-color));
    border-color: rgb(var(--dark-color));
  }
  .light &.secondary:hover {
    background-color: rgb(var(--dark-color));
    color: rgb(var(--light-color));
  }
  .light &.primary {
    background-color: rgb(var(--dark-color));
    color: rgb(var(--light-color));
  }
`;

export default Button;
