import React from "react";
import "./score.css";

export const Score = ({ score }) => {
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
    <div className="scoreContainer">
      <div className={`score${changing ? " changing" : ""}`}>
        <div className="bar" ref={ref}></div>{" "}
      </div>
      <div className="name">Chris</div>
      <div className="name">Will</div>
    </div>
  );
};
