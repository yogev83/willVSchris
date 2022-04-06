import React from "react";
import { shortTimeout, superLongTimeout, meduimTimeout } from "../../utils";
import chris_png from "../../images/chris.png";
import "./chris.css";

const SLAPPED_FRAME = 3;
const SLAPPING_RANGE = 20;

export const Chris = ({
  will_slapped_x,
  onSlapped,
  onJoked,
  onGone,
  position,
  jokeTime,
}) => {
  const [frame, setFrame] = React.useState(0);
  const [slapped, setSlapped] = React.useState(false);
  const [joked, setJoked] = React.useState(false);
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
    if (ref.current && will_slapped_x) {
      const chris_x = ref.current.getBoundingClientRect().left;
      const width = ref.current.getBoundingClientRect().width;
      if (
        chris_x + width - 50 - SLAPPING_RANGE < will_slapped_x &&
        will_slapped_x < chris_x + width - 50 + SLAPPING_RANGE
      ) {
        clearTimeout(jokeTimeoutId.current);
        onSlapped();
        setFrame(SLAPPED_FRAME);
      }
    }
  }, [onSlapped, will_slapped_x]);

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
            setJoked(true);
            onJoked();
            superLongTimeout(() => {
              onGone();
              setJoked(false);
            });
            setFrame(0);
          });
          break;
        }
        case SLAPPED_FRAME: {
          shortTimeout(() => {
            setFrame(frame + 1);
          });
          break;
        }
        case SLAPPED_FRAME + 1: {
          if (!slapped) {
            shortTimeout(() => {
              setSlapped(true);
              superLongTimeout(() => {
                onGone();
                setFrame(0);
                //HACK!!!
                meduimTimeout(() => {
                  setSlapped(false);
                });
              });
            });
          }
          break;
        }
        default: {
        }
      }
      const width = ref.current.getBoundingClientRect().width;
      ref.current.style.textIndent = `-${frame * width}px`;
    }
  }, [frame, onGone, onJoked, onSlapped, slapped]);

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
      <div className={`chris-text${text ? " show" : ""} noSelect`}>{text}</div>
      <div
        className={`noSelect character chris${
          slapped || joked ? " fading" : ""
        }${slapped ? " slapped" : ""}`}
      >
        <img src={chris_png} alt="Chris" />
      </div>
    </div>
  );
};
