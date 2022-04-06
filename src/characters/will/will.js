import React from "react";
import {
  shortTimeout,
  meduimTimeout,
  longTimeout,
  getTranslateValues,
  getScreenWidth,
} from "../../utils";
import will_png from "../../images/will.png";
import "./will.css";

const SPEED = 600;

export const Will = ({ moving, slaping, onSlap }) => {
  const [walking, setWalking] = React.useState(false);
  const [translateX, setTranslateX] = React.useState(0);
  const [frame, setFrame] = React.useState(0);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (slaping) {
      const will_x = ref.current.getBoundingClientRect().left;
      setFrame(2);
      meduimTimeout(() => {
        onSlap(will_x);
      });
    }
  }, [onSlap, slaping]);

  React.useEffect(() => {
    if (ref.current) {
      if (moving) {
        if (moving === "right") {
          const width = ref.current.getBoundingClientRect().width;
          const right = getScreenWidth() - width - 30;
          const dist = right - ref.current.getBoundingClientRect().left;
          const time = dist / SPEED;
          ref.current.style.transition = `transform ${time}s linear`;
          setTranslateX(right);
        } else if (moving === "left") {
          const dist = ref.current.getBoundingClientRect().right;
          const time = dist / SPEED;
          ref.current.style.transition = `transform ${time}s linear`;
          setTranslateX(0);
        }
        setWalking(true);
      } else {
        const { x } = getTranslateValues(ref.current);
        setTranslateX(x);
        setWalking(false);
      }
    }
  }, [onSlap, moving]);

  React.useEffect(() => {
    if (ref.current) {
      if (walking) {
        meduimTimeout(() => {
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

      const width = ref.current.getBoundingClientRect().width;
      ref.current.style.textIndent = `-${frame * width}px`;
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
