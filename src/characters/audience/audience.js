import React from "react";
import jada_png from "../../images/jada.png";
import mom_png from "../../images/mom.png";
import { superLongTimeout } from "../../utils";
import "./audience.css";

export const Audience = ({ who, enterLocation, onEntered }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (enterLocation && ref.current) {
      ref.current.style.left = `${enterLocation}px`;
    }

    //HACKY!!
    superLongTimeout(() => {
      onEntered();
    }, [onEntered]);
  }, [enterLocation, onEntered]);

  return (
    <div
      className={`audience noSelect ${enterLocation ? "enter" : ""}`}
      ref={ref}
    >
      {who === "jada" ? (
        <img src={jada_png} alt="jada" />
      ) : (
        <img src={mom_png} alt="mom" />
      )}
    </div>
  );
};
