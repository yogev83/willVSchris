import React from "react";
import { Will } from "../characters/will/will";
import { Chris } from "../characters/chris/chris";
import { Score } from "../score/score";
import { getRandomInt } from "../utils";
import "./playing.css";
import theme from "../audio/theme.mp3";
import { Controller } from "./controller/controller";

const SCREEN_PADDING = 100;
const ROUGH_CHARACTER_WIDTH = 120;

const audio = new Audio(theme);

const getChrisX = (last) => {
  let x = getRandomInt(
    SCREEN_PADDING,
    window.screen.width - SCREEN_PADDING - ROUGH_CHARACTER_WIDTH
  );
  while (x === last) {
    x = getRandomInt(SCREEN_PADDING, window.screen.width - SCREEN_PADDING);
  }
  return x;
};

const getChrisJokeTime = (last) => {
  let time = getRandomInt(1, 3) * 1000;
  while (time === last) {
    time = getRandomInt(1, 3) * 1000;
  }
  return time;
};

export function Playing() {
  const [slapped_x, setSlapped_x] = React.useState(null);
  const [chrisPosition, setChrisPosition] = React.useState(getChrisX());
  const [chrisJokeTime, setChrisJokeTime] = React.useState(getChrisJokeTime());

  const [moving, setMoving] = React.useState(null);
  const [slaping, setSlaping] = React.useState(false);

  const [score, setScore] = React.useState(50);

  const onSlapped = React.useCallback(() => {
    if (score < 100) {
      setScore((s) => s + 10);
    }

    setSlapped_x(null);
  }, [score]);

  const renewChris = React.useCallback(() => {
    setChrisPosition((s) => getChrisX(s));
    setChrisJokeTime((s) => getChrisJokeTime(s));
  }, []);

  const onJoked = React.useCallback(() => {
    if (score > 0) {
      setScore((s) => s - 10);
    }
  }, [score]);

  const onSlap = React.useCallback((will_x) => {
    setSlaping(false);
    setSlapped_x(will_x);
  }, []);

  const onTouchEvent = React.useCallback((event) => {
    if (event === "left" || event === "right") {
      setMoving(event);
    } else if (event === "action") {
      setSlaping(true);
      setMoving(null);
    } else {
      setMoving(null);
      setSlaping(null);
    }
  }, []);

  React.useEffect(() => {
    audio.loop = true;
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
          onGone={renewChris}
          position={chrisPosition}
          jokeTime={chrisJokeTime}
        />
        <Will onSlap={onSlap} moving={moving} slaping={slaping} />
        <Controller onTouchEvent={onTouchEvent} />
      </div>
    </div>
  );
}
