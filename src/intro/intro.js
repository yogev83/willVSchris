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
  const [logoGone, setLogoGone] = React.useState(true);
  const [ready, setReady] = React.useState(false);

  const onClick = React.useCallback(() => {
    document.addEventListener(
      "fullscreenchange",
      () => {
        window.screen.orientation
          .lock("landscape")
          .then(function () {
            onReady();
          })
          .catch(function (error) {
            console.error(error);
            onReady();
          });
      },
      [onReady]
    );
    toggleFullScreen();
  }, [onReady]);

  React.useEffect(() => {
    setLogoGone(false);
    setTimeout(() => {
      setLogoGone(true);
    }, 2000);
    setTimeout(() => {
      setReady(true);
    }, 3000);
  }, []);

  return (
    <div className="intro">
      <div className={`hb ${logoGone ? " hidden" : ""}`}>
        <img src={hb_png} alt="hb" />
      </div>
      {ready ? (
        <>
          <div className="logo">
            <img src={logo_png} alt="hb" />
          </div>
          <button onClick={onClick}>Click to Play</button>
        </>
      ) : null}
    </div>
  );
}
