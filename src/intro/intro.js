import React from "react";
import screenfull from "screenfull";

import hb_png from "../images/hb.png";
import logo_png from "../images/logo.png";
import "./intro.css";

function toggleFullScreen() {
  if (screenfull.isEnabled) {
    screenfull.request();
  }
}

export function Intro({ onReady }) {
  const [logoGone, setLogoGone] = React.useState(false);
  const [ready, setReady] = React.useState(false);
  const ref = React.useRef(null);

  const onClick = React.useCallback(() => {
    toggleFullScreen();
    window.screen.orientation
      .lock("landscape")
      .then(function () {
        onReady();
      })
      .catch(function (error) {
        console.error(error);
        onReady();
      });
  }, [onReady]);

  React.useEffect(() => {
    ref.current.addEventListener("touchstart", onClick);
  }, [onClick]);

  React.useEffect(() => {
    setTimeout(() => {
      setLogoGone(true);
    }, 2000);
    setTimeout(() => {
      setReady(true);
    }, 3000);
  }, []);

  return (
    <div className="intro">
      <div className={`hb ${logoGone ? "hidden" : ""}`}>
        <img src={hb_png} alt="hb" />
      </div>
      {ready ? (
        <>
          <div className="logo">
            <img src={logo_png} alt="hb" />
          </div>
          <div className="clickToPlay" ref={ref} onClick={onClick}>
            Click to Play
          </div>
        </>
      ) : null}
    </div>
  );
}
