import React from "react";
import { Will } from "../characters/will/will";
import { Chris } from "../characters/chris/chris";
import { Score } from "../score/score";
import { getRandomInt } from "../utils";
import "./playing.css";
import theme from "../audio/theme.mp3";

const SCREEN_PADDING = 100;

const audio = new Audio(theme);

const getChrisX = (last) => {
  let x = getRandomInt(
    SCREEN_PADDING,
    window.screen.width - SCREEN_PADDING - 100
  );
  while (x === last) {
    x = getRandomInt(SCREEN_PADDING, window.screen.width - SCREEN_PADDING);
  }
  return x;
};

const getChrisJokeTime = (last) => {
  let time = getRandomInt(1, 5) * 1000;
  while (time === last) {
    time = getRandomInt(1, 5) * 1000;
  }
  return time;
};

export function Playing() {
  const [slapped_x, setSlapped_x] = React.useState(null);
  const [chrisPosition, setChrisPosition] = React.useState(getChrisX());
  const [chrisJokeTime, setChrisJokeTime] = React.useState(getChrisJokeTime());
  const [score, setScore] = React.useState(50);

  const onSlapped = React.useCallback(() => {
    if (score < 100) {
      setScore((s) => s + 10);
    }

    setSlapped_x(null);
    setChrisPosition((s) => getChrisX(s));
    setChrisJokeTime((s) => getChrisJokeTime(s));
  }, [score]);

  const onJoked = React.useCallback(() => {
    if (score > 0) {
      setScore((s) => s - 10);
    }
    setChrisJokeTime((s) => getChrisJokeTime(s));
  }, [score]);

  const onSlap = React.useCallback((will_x) => {
    setSlapped_x(will_x);
  }, []);

  React.useEffect(() => {
    audio.play();
  }, []);

  return (
    <div className="playing">
      <Score score={score} />
      <div className="characters">
        <Chris
          will_slapped_x={slapped_x}
          onSlapped={onSlapped}
          onJoked={onJoked}
          position={chrisPosition}
          jokeTime={chrisJokeTime}
        />
        <Will onSlap={onSlap} />
      </div>
    </div>
  );
}
