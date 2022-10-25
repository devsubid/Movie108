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
      type: "accept",
      accent: "info"
      action: () => {}
    },{
      text: "Ok",
      type: "accept",
      accent: "success"
      action: () => {}
    },
    {
      text: "Delete",
      type: "accept",
      accent: "danger"
      action: () => {}
    } */,
  });
  return (
    <ModalContext.Provider
      value={{
        modal,
        setModal,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalState;
