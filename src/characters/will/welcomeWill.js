import React from "react";
import will_png from "../../images/will.png";
import "./welcomeWill.css";

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
      const width = ref.current.getBoundingClientRect().width;
      ref.current.style.textIndent = `-${frame * width}px`;
    }
  }, [frame, scream]);

  React.useEffect(() => {
    ref.current.style.transform = `translateX(${translateX}px)`;
  }, [translateX]);

  return (
    <div className={`welcomeWillWrapper ${enter ? " enter" : ""}`} ref={ref}>
      {scream ? (
        <div className="will-text">
          <div className="noSelect">{TEXT0}</div>
          <div className="noSelect">{TEXT1}</div>
        </div>
      ) : null}
      <div className="welcomeWill noSelect character">
        <img src={will_png} alt="Will" />
      </div>
    </div>
  );
};
