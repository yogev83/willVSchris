import React from "react";
import { isMobile } from "../../utils";
import "./muteButton.css";

export const MuteButton = ({ audio }) => {
  const [muted, setMuted] = React.useState(isMobile());

  const onClick = () => {
    if (muted) {
      audio.volume = 1;
    } else {
      audio.volume = 0;
    }
    setMuted((s) => !s);
  };

  return (
    <div className="muteWrapper">
      <div className={`speaker${muted ? " mute" : ""}`} onClick={onClick}>
        <span></span>
      </div>
    </div>
  );
};
