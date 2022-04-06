import React from "react";
import chris_png from "../../images/chrisWin.png";
import "./winChris.css";

const TEXT = "That was a nice one!";

export const WinChris = () => {
  const ref = React.useRef(null);

  return (
    <div className="winChrisWrapper" ref={ref}>
      <div className={`chris-text${TEXT ? " show" : ""} noSelect`}>{TEXT}</div>
      <div className={`noSelect character winChris`}>
        <img src={chris_png} alt="Chris" />
      </div>
    </div>
  );
};
