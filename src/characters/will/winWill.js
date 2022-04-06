import React from "react";
import will_png from "../../images/willWin.png";
import "./winWill.css";

const TEXT = "I am a river of peace...";

export const WinWill = () => {
  const ref = React.useRef(null);

  return (
    <div className="winWillWrapper" ref={ref}>
      <div className={`will-text${TEXT ? " show" : ""} noSelect`}>{TEXT}</div>
      <div className={`noSelect character winWill`}>
        <img src={will_png} alt="Will" />
      </div>
    </div>
  );
};
