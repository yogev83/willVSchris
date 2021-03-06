import React from "react";
import screenfull from "screenfull";

import hb_png from "../images/hb.png";
import logo_png from "../images/logo.png";
import { isMobile } from "../utils";
import "./intro.css";

function toggleFullScreen() {
  if (screenfull.isEnabled) {
    screenfull.request();
    return true;
  }
  return false;
}

export function Intro({ onReady }) {
  const [logoGone, setLogoGone] = React.useState(true);
  const [ready, setReady] = React.useState(false);
  const [notSupported, setNotSupported] = React.useState(false);

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
            setNotSupported(true);
            onReady();
          });
      },
      [onReady]
    );

    if (isMobile()) {
      const goingFs = toggleFullScreen();
      if (!goingFs) {
        setNotSupported(true);
        onReady();
      }
    } else {
      onReady();
    }
  }, [onReady]);

  React.useEffect(() => {
    setLogoGone(false);
    setTimeout(() => {
      setLogoGone(true);
    }, 1500);
    setTimeout(() => {
      isMobile() ? setReady(true) : onReady();
    }, 2500);
  }, [onReady]);

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

          {notSupported ? (
            <div className="notSupported">
              Sorry. Your device is currently not supported (But we are on it!)
            </div>
          ) : (
            <>
              <div className="clickToPlay" onClick={onClick}>
                Click to Play
              </div>
              <div className="turn">
                Please make sure screen rotation is enabled
                <br />
                and rotate device
              </div>
            </>
          )}
        </>
      ) : null}
    </div>
  );
}
