import React, { useContext } from "react";
import styled, { keyframes } from "styled-components";
import LoadingContext from "./../../context/loading/loadingContext";

const spinnerAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
`;

const Spinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--dark-color), 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  ${(props) =>
    !props.loading.loading &&
    "display: none;"} // if loading is false, display none
  & span {
    width: 2.5rem;
    height: 2.5rem;
    position: absolute;
    top: calc(45% - 1.75rem);
    left: calc(50% - 1.75rem);
    border-radius: 50%;
    border-top: 4px solid rgba(var(--light-color), 1);
    border-left: 4px solid rgba(var(--light-color), 1);
    border-right: 4px solid rgba(var(--light-color), 0);
    animation: ${spinnerAnimation} 0.6s linear infinite;
  }
`;

const Loading = () => {
  const loadingContext = useContext(LoadingContext);
  return (
    <Spinner loading={loadingContext}>
      <span></span>
    </Spinner>
  );
};

export default Loading;
