import ModalContext from "./modalContext";
import React, { useState } from "react";

const ModalState = (props) => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    body: "",
    accent: "",
    footer: [] /*
    default footer is an array of objects with the following properties:
    {
      text: "Close",
      type: "close",
      accent: "info"
    },{
      text: "Ok",
      type: "accept",
      accent: "success"
    } */,
  });
  const toggleModal = () => {
    setModal({ ...modal, isOpen: !modal.isOpen });
  };
  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
        toggleModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
