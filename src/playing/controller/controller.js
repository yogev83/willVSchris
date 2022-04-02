import React from "react";
import { ControlButton } from "./controlButton";
import "./controller.css";

export const Controller = ({ onClick }) => {
  return (
    <div className="controller">
      <ControlButton className="left" />
      <ControlButton className="right" />
      <ControlButton className="action" />
    </div>
  );
};
