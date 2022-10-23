import React, { useContext } from "react";
import styled from "styled-components";
import ModalContext from "../../context/modal/modalContext";
import cross from "../../assets/cross.svg";
import tick from "../../assets/tick.svg";

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: all 0.15s ease;
  & .modalWrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: min(30rem, 50%);
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    background: rgb(var(--dark-color));
    color: rgb(var(--light-color));
    box-shadow: 0 0 20px rgb(var(--dark-color), 0.15);
    @media screen and (max-width: 50rem) {
      width: 90%;
      height: auto;
    }
  }
  .light & .modalWrapper {
    background: rgb(var(--light-color));
    color: rgb(var(--dark-color));
    box-shadow: 0 0 20px rgb(var(--light-color), 0.5);
  }
  &.showModal {
    opacity: 1;
    visibility: visible;
  }
  & .cross {
    position: relative;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    background-color: #d11a2a;
    mask: url(${cross}) no-repeat center;
    transform: rotate(45deg);
  }
  & .tick {
    position: relative;
    width: 5rem;
    height: 5rem;
    cursor: pointer;
    background-color: green;
    mask: url(${tick}) no-repeat center;
  }
  & .confirmation {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-grow: 1;
    justify-content: center;
    gap: 1rem;
    & h3 {
      font-size: 1.5rem;
      font-weight: 700;
    }
    & .modalBody {
      width: 90%;
      text-align: center;
    }
    & .buttons {
      flex-grow: 1;
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      gap: 1rem;
      & .accept {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        color: rgb(var(--light-color));
        cursor: pointer;
        font-weight: bold;
        font-size: medium;
        &.info {
          background-color: currentColor;
          color: rgb(var(--dark-color));
        }
        &.success {
          background-color: green;
        }
        &.danger {
          background-color: #d11a2a;
        }
      }
      & .close {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        background-color: rgb(var(--light-color));
        color: rgb(var(--dark-color));
        cursor: pointer;
        font-weight: bold;
        font-size: medium;
        .light & {
          background-color: rgb(var(--dark-color));
          color: rgb(var(--light-color));
        }
      }
    }
  }
`;

const Modal = () => {
  const modalContext = useContext(ModalContext);
  return (
    <ModalDiv className={`modal ${modalContext.modal.isOpen && "showModal"}`}>
      <div className="modalWrapper">
        <div className={`${modalContext.modal.accent}`}></div>
        <div className="confirmation">
          <h3>{modalContext.modal.title}</h3>
          {modalContext.modal.body && (
            <div className="modalBody">
              <p>{modalContext.modal.body}</p>
            </div>
          )}
          <div className="buttons">
            {modalContext.modal.footer.map((item, key) => (
              <button
                className={`${item.type} ${item.accent}`}
                onClick={modalContext.toggleModal}
                key={key}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ModalDiv>
  );
};

export default Modal;
