import React from "react";
import { ControlButton } from "./controlButton";
import "./controller.css";

export const Controller = ({ onTouchEvent }) => {
  return (
    <div className="controller">
      <ControlButton type="left" onTouchEvent={onTouchEvent} />
      <ControlButton type="right" onTouchEvent={onTouchEvent} />
      <ControlButton type="action" onTouchEvent={onTouchEvent} />
    </div>
  );
};
