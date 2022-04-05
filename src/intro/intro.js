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
  const onClick = React.useCallback(() => {
    toggleFullScreen();
    onReady();
  }, [onReady]);

  React.useEffect(() => {
    setTimeout(() => {
      setLogoGone(true);
    }, 2000);
    setTimeout(() => {
      window.screen.orientation
        .lock("portrait")
        .then(function () {
          setReady(true);
        })
        .catch(function (error) {
          console.error(error);
          setReady(true);
        });
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
          <div className="clickToPlay" onClick={onClick}>
            Click to Play
          </div>
        </>
      ) : null}
    </div>
  );
}
