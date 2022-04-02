import React from "react";
import { shortTimeout, superLongTimeout, meduimTimeout } from "../../utils";
import chris_png from "../../images/chris.png";
import "./welcomeChris.css";

const WIDTH = 98;
const SPLAPPED_FRAME = 3;
const SLAPPING_RANGE = 70;

const TEXT0 = `Jada... G.I. Jane2,`;
const TEXT1 = `can't wait to see it!`;

export const WelcomeChris = ({ joke, translateX, enter }) => {
  const [frame, setFrame] = React.useState(0);
  const [slapped, setSlapped] = React.useState(false);
  const ref = React.useRef(null);
  const jokeTimeoutId = React.useRef(null);

  const text = React.useMemo(() => {
    switch (frame) {
      case 1: {
        return "Jada...";
      }
      case 2: {
        return "G.I. Jane2!";
      }
      default:
        return "";
    }
  }, [frame]);

  React.useEffect(() => {
    if (ref.current) {
      switch (frame) {
        case 1: {
          superLongTimeout(() => {
            setFrame(2);
          });
          break;
        }
        case 2: {
          jokeTimeoutId.current = superLongTimeout(() => {
            setFrame(0);
          });
          break;
        }
        default: {
        }
      }
      ref.current.style.textIndent = `-${frame * WIDTH}px`;
    }
  }, [frame, slapped]);

  React.useEffect(() => {
    ref.current.style.transform = `translateX(${translateX}px)`;
  }, [translateX]);

  React.useEffect(() => {
    if (ref.current && joke) {
      setFrame(1);
    }
  }, [joke]);

  return (
    <div className={`welcomeChrisWrapper ${enter ? " enter" : ""} `} ref={ref}>
      {joke ? (
        <div className="chris-text">
          <div>{TEXT0}</div>
          <div>{TEXT1}</div>
        </div>
      ) : null}
      <div className={"noSelect character welcomeChris"}>
        <img src={chris_png} alt="Chris" />
      </div>
    </div>
  );
};
