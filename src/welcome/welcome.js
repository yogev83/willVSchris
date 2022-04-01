import React from "react";
import "./welcome.css";

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}

export function Welcome({ onStart }) {
  const onClick = React.useCallback(() => {
    toggleFullScreen();
    onStart();
  }, [onStart]);

  return (
    <div className="welcome">
      <button onClick={onClick}>Start</button>
    </div>
  );
}
