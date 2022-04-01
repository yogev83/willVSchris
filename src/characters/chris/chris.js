import React from "react";
import { shortTimeout, superLongTimeout } from "../../utils";
import chris_png from "../../images/chris.png";
import "./chris.css";

const WIDTH = 98;
const SPLAPPED_FRAME = 3;
const SLAPPING_RANGE = 180;

export const Chris = ({
  will_slapped_x,
  onSlapped,
  onJoked,
  position,
  jokeTime,
}) => {
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
    if (will_slapped_x) {
      const chris_x = ref.current.getBoundingClientRect().left;
      if (
        chris_x > will_slapped_x - SLAPPING_RANGE &&
        chris_x < will_slapped_x + SLAPPING_RANGE
      ) {
        clearTimeout(jokeTimeoutId.current);
        setFrame(SPLAPPED_FRAME);
      }
    }
  }, [will_slapped_x]);

  React.useEffect(() => {
    if (ref.current) {
      switch (frame) {
        case 1: {
          jokeTimeoutId.current = superLongTimeout(() => {
            setFrame(2);
          });
          break;
        }
        case 2: {
          jokeTimeoutId.current = superLongTimeout(() => {
            setFrame(0);
            onJoked();
          });
          break;
        }
        case SPLAPPED_FRAME: {
          shortTimeout(() => {
            setFrame(frame + 1);
          });
          break;
        }
        case SPLAPPED_FRAME + 1: {
          shortTimeout(() => {
            let transitionendFired = false;
            const onGone = () => {
              if (transitionendFired) {
                return;
              }
              transitionendFired = true;
              ref.current.removeEventListener("animationend", onGone);
              onSlapped();
              setSlapped(false);
              setFrame(0);
            };

            setSlapped(true);
            ref.current.addEventListener("transitionend", onGone);
          });
          break;
        }
        default: {
        }
      }
      ref.current.style.textIndent = `-${frame * WIDTH}px`;
    }
  }, [frame, onJoked, onSlapped]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.left = `${position}px`;
    }
  }, [position]);

  React.useEffect(() => {
    clearTimeout(jokeTimeoutId.current);
    jokeTimeoutId.current = setTimeout(() => {
      if (ref.current) {
        setFrame(1);
      }
    }, jokeTime);
  }, [jokeTime]);

  return (
    <div className="chrisWrapper" ref={ref}>
      <div className="chris-text">{text}</div>
      <div className={`noSelect character chris${slapped ? " slapped" : ""}`}>
        <img src={chris_png} alt="Chris" />
      </div>
    </div>
  );
};
