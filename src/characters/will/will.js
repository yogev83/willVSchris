import React from "react";
import {
  superShortTimeout,
  shortTimeout,
  meduimTimeout,
  longTimeout,
} from "../../utils";
import will_png from "../../images/will.png";
import "./will.css";

const WIDTH = 99;
const SPEED_REDUCER = 10;
const BENCHMARK = 20;

export const Will = ({ onSlap }) => {
  const [walking, setWalking] = React.useState(false);
  const [translateX, setTranslateX] = React.useState(0);
  const [frame, setFrame] = React.useState(0);
  const ref = React.useRef(null);
  const listenersAdded = React.useRef(false);

  React.useEffect(() => {
    if (ref.current && !listenersAdded.current) {
      let fastClickTimeout;
      let walkingTimout;

      const slap = () => {
        const will_x = ref.current.getBoundingClientRect().left;
        clearTimeout(fastClickTimeout);
        setWalking(false);
        setFrame(2);
        meduimTimeout(() => {
          onSlap(will_x);
        });
      };

      const endWalking = () => {
        document.removeEventListener("mouseup", endWalking);
        clearTimeout(walkingTimout);
        setWalking(false);
      };

      const walk = (event) => {
        const will_x = ref.current.getBoundingClientRect().left;
        const mouse_x = event.pageX;

        let delta = mouse_x - will_x;
        let speed = delta / SPEED_REDUCER;
        let steps =
          speed < 0 ? Math.min(speed, -BENCHMARK) : Math.max(speed, BENCHMARK);
        setTranslateX((s) => s + steps);

        if (steps === BENCHMARK) {
          endWalking();
        } else {
          walkingTimout = superShortTimeout(() => {
            walk(event);
          });
        }
      };

      const onMouseClick = (event) => {
        fastClickTimeout = shortTimeout(() => {
          document.removeEventListener("mouseup", slap);
          document.addEventListener("mouseup", endWalking);
          walk(event);
          setWalking(true);
        });
        document.addEventListener("mouseup", slap);
      };

      document.addEventListener("mousedown", onMouseClick);
      listenersAdded.current = true;
    }
  }, [onSlap]);

  React.useEffect(() => {
    if (ref.current) {
      if (walking) {
        longTimeout(() => {
          setFrame(frame === 1 ? 0 : 1);
        });
      } else if (frame === 2) {
        shortTimeout(() => {
          setFrame(3);
        });
      } else if (frame === 3) {
        shortTimeout(() => {
          setFrame(4);
        });
      } else if (frame === 4) {
        longTimeout(() => {
          setFrame(0);
        });
      }
      ref.current.style.textIndent = `-${frame * WIDTH}px`;
    }
  }, [frame, walking]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  return (
    <div className="will noSelect  character" ref={ref}>
      <img src={will_png} alt="Will" />
    </div>
  );
};
