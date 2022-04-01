import React from "react";
import { Will } from "../characters/will/will";
import { Chris } from "../characters/chris/chris";
import "./welcome.css";

export function Welcome({ onStart }) {
  return (
    <div className="welcome">
      <Chris />
      <Will />
    </div>
  );
}
