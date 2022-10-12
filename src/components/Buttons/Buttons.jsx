import "./Buttons.css";
import React from "react";

function Buttons({ btnType, btnText, btnSize, btnDegree }) {
  return (
    <button className={`${btnSize} ${btnDegree}`} type={btnType}>
      {btnText}
    </button>
  );
}

export default Buttons;
