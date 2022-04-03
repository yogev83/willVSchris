import React from "react";
import {
  shortTimeout,
  meduimTimeout,
  longTimeout,
  getTranslateValues,
} from "../../utils";
import will_png from "../../images/will.png";
import "./will.css";

const WIDTH = 99;
// const SPEED_REDUCER = 10;
const SPEED = 600;
// const BENCHMARK = 20;
const RIGHT_END = window.screen.width - WIDTH - 30;

export const Will = ({ moving, slaping, onSlap }) => {
  const [walking, setWalking] = React.useState(false);
  const [translateX, setTranslateX] = React.useState(0);
  const [frame, setFrame] = React.useState(0);
  const ref = React.useRef(null);
  // const walkingInterval = React.useRef(null);
  // const listenersAdded = React.useRef(false);

  React.useEffect(() => {
    if (slaping) {
      const will_x = ref.current.getBoundingClientRect().left;
      // setWalking(false);
      setFrame(2);
      meduimTimeout(() => {
        onSlap(will_x);
      });
    }
  }, [onSlap, slaping]);

  React.useEffect(() => {
    if (ref.current) {
      //    let fastClickTimeout;
      //  let walkingTimout;

      // const slap = () => {
      //   const will_x = ref.current.getBoundingClientRect().left;
      //   clearTimeout(fastClickTimeout);
      //   setWalking(false);
      //   setFrame(2);
      //   meduimTimeout(() => {
      //     onSlap(will_x);
      //   });
      // };

      // const endWalking = () => {
      //   // document.removeEventListener("mouseup", endWalking);
      //   // document.removeEventListener("touchend", endWalking);
      //   //  clearTimeout(walkingInterval);
      //   clearInterval(walkingInterval);
      //   setWalking(false);
      // };

      // const walk = (movingDirection) => {
      //   const will_x = ref.current.getBoundingClientRect().left;
      //   //const mouse_x = event.pageX || event.touches[0].clientX;

      //   // let delta = mouse_x - will_x;

      //   //let speed = delta / SPEED_REDUCER;
      //   // let steps =
      //   //   speed < 0 ? Math.min(speed, -BENCHMARK) : Math.max(speed, BENCHMARK);
      //   const steps = 10 * (movingDirection === "left" ? -1 : 1);
      //   setTranslateX((s) => s + steps);

      //   // if (steps === BENCHMARK) {
      //   //   endWalking();
      //   // } else {
      //   //   walkingTimout = superShortTimeout(() => {
      //   //     walk(event);
      //   //   });
      //   // }

      // };

      if (moving) {
        // walkingInterval.current = setInterval(() => {
        //   console.log("walkingInterval");
        //   walk(moving);
        // }, 30);
        if (moving === "right") {
          const dist = RIGHT_END - ref.current.getBoundingClientRect().left;
          const time = dist / SPEED;
          ref.current.style.transition = `transform ${time}s linear`;
          setTranslateX(RIGHT_END);
        } else if (moving === "left") {
          const dist = ref.current.getBoundingClientRect().right;
          const time = dist / SPEED;
          ref.current.style.transition = `transform ${time}s linear`;
          setTranslateX(0);
        }
        setWalking(true);
      } else {
        // console.log("clearTimeout endWalking", walkingInterval);
        //  clearTimeout(walkingInterval);
        //clearInterval(walkingInterval.current);
        const { x } = getTranslateValues(ref.current);
        setTranslateX(x);
        setWalking(false);
        // endWalking();
      }
      // const onMouseClick = (event) => {
      //   fastClickTimeout = shortTimeout(() => {
      //     document.removeEventListener("mouseup", slap);
      //     document.removeEventListener("touchend", slap);

      //     document.addEventListener("mouseup", endWalking);
      //     document.addEventListener("touchend", endWalking);
      //     walk(event);
      //     setWalking(true);
      //   });
      //   document.addEventListener("mouseup", slap);
      //   document.addEventListener("touchend", slap);
      // };

      // document.addEventListener("mousedown", onMouseClick);
      // document.addEventListener("touchstart", onMouseClick);

      // listenersAdded.current = true;
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
