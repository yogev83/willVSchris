import React from "react";
import { WelcomeChris } from "../characters/chris/welcomeChris";
import { WelcomeWill } from "../characters/will/welcomeWill";
import { superLongTimeout } from "../utils";

import "./welcome.css";

export function Welcome({ onStart }) {
  const [chrisIn, setChrisIn] = React.useState(false);
  const [chris_joke, setChris_joke] = React.useState(false);
  const [willIn, setWillIn] = React.useState(false);
  const [will_scream, setWill_scream] = React.useState(false);

  const onClick = React.useCallback(() => {
    onStart();
  }, [onStart]);

  React.useEffect(() => {
    setChrisIn(true);
    superLongTimeout(() => {
      setWillIn(true);
      superLongTimeout(() => {
        setChris_joke(true);
        setTimeout(() => {
          setChris_joke(false);
          setWill_scream(true);
          setTimeout(() => {
            setWill_scream(false);
            onStart();
          }, 2500);
        }, 3000);
      });
    });
  }, [onStart]);

  return (
    <div className="welcome">
      <div className="characters">
        <WelcomeChris
          joke={chris_joke}
          translateX={
            chrisIn
              ? window.screen.width * 0.4 - 150
              : window.screen.width * 0.2
          }
          enter={chrisIn}
        />
        <WelcomeWill
          scream={will_scream}
          translateX={
            willIn ? window.screen.width * 0.6 : window.screen.width * 0.8
          }
          enter={willIn}
        />
      </div>
      <div className="skip" onClick={onClick}>
        SKIP
      </div>
    </div>
  );
}
