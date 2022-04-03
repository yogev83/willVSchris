import React from "react";
import { superLongTimeout } from "../../utils";
import chris_png from "../../images/chris.png";
import "./welcomeChris.css";

const TEXT0 = `Jada... G.I. Jane2,`;
const TEXT1 = `can't wait to see it!`;

export const WelcomeChris = ({ joke, translateX, enter }) => {
  const [frame, setFrame] = React.useState(0);
  const ref = React.useRef(null);
  const jokeTimeoutId = React.useRef(null);

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

      const width = ref.current.getBoundingClientRect().width;
      ref.current.style.textIndent = `-${frame * width}px`;
    }
  }, [frame]);

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
