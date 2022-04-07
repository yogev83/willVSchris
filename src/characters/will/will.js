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
import mergeRefs from "react-merge-refs";

const SPEED = 600;

export const Will = React.forwardRef(
  ({ moving, slaping, onSlap, flipped }, ref) => {
    const [walking, setWalking] = React.useState(false);
    const [translateX, setTranslateX] = React.useState(0);
    const [frame, setFrame] = React.useState(0);
    const willRef = React.useRef(null);

    React.useEffect(() => {
      if (slaping) {
        const will_x = willRef.current.getBoundingClientRect().left;
        setFrame(2);
        meduimTimeout(() => {
          onSlap(will_x);
        });
      }
    }, [onSlap, slaping]);

    React.useEffect(() => {
      if (willRef.current) {
        if (moving) {
          if (moving === "right") {
            const width = willRef.current.getBoundingClientRect().width;
            const right = getScreenWidth() - width - 30;
            const dist = right - willRef.current.getBoundingClientRect().left;
            const time = dist / SPEED;
            willRef.current.style.transition = `transform ${time}s linear`;
            setTranslateX(right);
          } else if (moving === "left") {
            const dist = willRef.current.getBoundingClientRect().right;
            const time = dist / SPEED;
            willRef.current.style.transition = `transform ${time}s linear`;
            setTranslateX(0);
          }
          setWalking(true);
        } else {
          const { x } = getTranslateValues(willRef.current);
          setTranslateX(x);
          setWalking(false);
        }
      }
    }, [onSlap, moving]);

    React.useEffect(() => {
      if (willRef.current) {
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

        const width = willRef.current.getBoundingClientRect().width;
        willRef.current.style.textIndent = `-${frame * width}px`;
      }
    }, [frame, walking]);

    React.useEffect(() => {
      if (willRef.current) {
        willRef.current.style.transform = `translateX(${translateX}px)`;
      }
    }, [translateX]);

    return (
      <div className="will noSelect  character" ref={mergeRefs([willRef, ref])}>
        <img src={will_png} alt="Will" />
      </div>
    );
  }
);
