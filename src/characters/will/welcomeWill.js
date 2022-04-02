import React from "react";
import {
  superShortTimeout,
  shortTimeout,
  meduimTimeout,
  longTimeout,
} from "../../utils";
import will_png from "../../images/will.png";
import "./welcomeWill.css";

const WIDTH = 99;
const SPEED_REDUCER = 10;
const BENCHMARK = 20;

const TEXT0 = `Get her name out of`;
const TEXT1 = `your @*%$#&# mouth!`;

export const WelcomeWill = ({ scream, translateX, enter }) => {
  const [frame, setFrame] = React.useState(1);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (ref.current) {
      if (scream) {
        setFrame(5);
      } else if (frame === 5) {
        setFrame(0);
      }
      ref.current.style.textIndent = `-${frame * WIDTH}px`;
    }
  }, [frame, scream]);

  React.useEffect(() => {
    ref.current.style.transform = `translateX(${translateX}px)`;
  }, [translateX]);

  return (
    <div className={`welcomeWillWrapper ${enter ? " enter" : ""}`} ref={ref}>
      {scream ? (
        <div className="will-text">
          <div>{TEXT0}</div>
          <div>{TEXT1}</div>
        </div>
      ) : null}
      <div className="welcomeWill noSelect character">
        <img src={will_png} alt="Will" />
      </div>
    </div>
  );
};
