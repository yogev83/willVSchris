import React from "react";
import "./controller.css";

export const ControlButton = ({ type, onTouchEvent }) => {
  const ref = React.useRef(null);

  const onTouchStart = React.useCallback(() => {
    onTouchEvent(type);
  }, [onTouchEvent, type]);

  const onTouchEnd = React.useCallback(() => {
    onTouchEvent(null);
  }, [onTouchEvent]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("touchstart", onTouchStart, false);
      ref.current.addEventListener("touchend", onTouchEnd, false);
    }
  }, [onTouchEnd, onTouchStart]);

  return (
    <div className={`controlButton ${type}`} ref={ref}>
      <i className="icon"></i>
    </div>
  );
};
