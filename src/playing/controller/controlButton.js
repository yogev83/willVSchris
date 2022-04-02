import React from "react";
import "./controller.css";

export const ControlButton = ({ type, onClick, className }) => {
  const actionClicked = React.useCallback(() => {
    onClick(type);
  }, [onClick, type]);

  return (
    <div className={`controlButton ${className}`} onClick={actionClicked}></div>
  );
};
