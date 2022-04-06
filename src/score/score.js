import React from "react";
import { toCammel } from "../utils";
import "./score.css";

export const Score = ({ score, who }) => {
  const ref = React.useRef(null);
  const [changing, setChanging] = React.useState(false);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.style.width = `${score}%`;
    }
  }, [score]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("transitionstart", () => {
        setChanging(true);
      });
      ref.current.addEventListener("transitionend", () => {
        setChanging(false);
      });
    }
  }, []);

  return (
    <div className={`scoreContainer ${who}`}>
      <div className={`score${changing ? " changing" : ""}`}>
        <div className="bar" ref={ref}></div>{" "}
      </div>
      <div className="name">{toCammel(who)}</div>
    </div>
  );
};
