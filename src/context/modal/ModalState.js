import ModalContext from "./modalContext";
import React, { useState } from "react";

const ModalState = (props) => {
  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    body: "",
    accent: "",
    footer: [],
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
