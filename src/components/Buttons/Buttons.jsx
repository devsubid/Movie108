import "./Buttons.css";
import React from "react";

function Buttons({ btnType, btnText }) {
  return <button type={btnType}>{btnText}</button>;
}

export default Buttons;
