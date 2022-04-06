import React from "react";
import { Will } from "../characters/will/will";
import { Chris } from "../characters/chris/chris";
import { Audience } from "../characters/audience/audience";
import { Score } from "../score/score";
import { getRandomInt } from "../utils";
import "./playing.css";
import { Again } from "./again";
import theme from "../audio/theme.mp3";
import { Controller } from "./controller/controller";
import { WinChris } from "../characters/chris/winChris";
import { WinWill } from "../characters/will/winWill";
import { MuteButton } from "./muteButton/muteButton";

const SCREEN_PADDING = 100;
const ROUGH_CHARACTER_WIDTH = 120;
const ROUGH_JADA_WIDTH = 240;

const audio = new Audio(theme);

const getChrisX = (last) => {
  let x = getRandomInt(
    SCREEN_PADDING,
    window.screen.width - SCREEN_PADDING - ROUGH_CHARACTER_WIDTH
  );
  while (x === last) {
    x = getRandomInt(
      SCREEN_PADDING,
      window.screen.width - SCREEN_PADDING - ROUGH_CHARACTER_WIDTH
    );
  }
  return x;
};

const getJadaX = () => {
  const x = getRandomInt(
    SCREEN_PADDING,
    window.screen.width - SCREEN_PADDING - ROUGH_JADA_WIDTH
  );
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

  const [jadaEnterLocation, setJadaEnterLocation] = React.useState(null);
  const [momEnterLocation, setMomEnterLocation] = React.useState(null);

  const [scoreWill, setScoreWill] = React.useState(50);
  const [scoreChris, setScoreChris] = React.useState(1);

  const onReset = React.useCallback(() => {
    setSlapped_x(null);
    setChrisPosition(getChrisX());
    setChrisJokeTime(getChrisJokeTime());
    setMoving(null);
    setSlaping(false);
    setJadaEnterLocation(null);
    setMomEnterLocation(null);
    setScoreWill(50);
    setScoreChris(50);
  }, []);

  const onSlapped = React.useCallback(() => {
    setScoreChris((s) => Math.min(s - 5, 100));
    setSlapped_x(null);
    const momRandom = getRandomInt(0, 5);
    if (momRandom === 0) {
      setMomEnterLocation(getJadaX());
    }
  }, []);

  const renewChris = React.useCallback(() => {
    setChrisPosition((s) => getChrisX(s));
    setChrisJokeTime((s) => getChrisJokeTime(s));
  }, []);

  const onJoked = React.useCallback(() => {
    setScoreWill((s) => Math.max(s - 15, 0));
    const jadaRandom = getRandomInt(0, 5);
    if (jadaRandom === 0) {
      setJadaEnterLocation(getJadaX());
    }
  }, []);

  const audienceEntered = React.useCallback(() => {
    setJadaEnterLocation(null);
    setMomEnterLocation(null);
  }, []);

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
    audio.volume = 0;
    audio.play();
  }, []);

  return (
    <div className="playing">
      <Score score={scoreWill} who="will" />
      <Score score={scoreChris} who="chris" />
      <div className="characters">
        {scoreWill <= 0 ? (
          <>
            <WinChris />
            <Again onClick={onReset} />
          </>
        ) : scoreChris <= 0 ? (
          <>
            <WinWill />
            <Again onClick={onReset} score={scoreWill} />
          </>
        ) : (
          <>
            <Chris
              will_slapped_x={slapped_x}
              onSlapped={onSlapped}
              onJoked={onJoked}
              onGone={renewChris}
              position={chrisPosition}
              jokeTime={chrisJokeTime}
            />
            <Will onSlap={onSlap} moving={moving} slaping={slaping} />
            <Audience
              who="jada"
              enterLocation={jadaEnterLocation}
              onEntered={audienceEntered}
            />
            <Audience
              who="mom"
              enterLocation={momEnterLocation}
              onEntered={audienceEntered}
            />
            <Controller onTouchEvent={onTouchEvent} />
          </>
        )}
        <MuteButton audio={audio} />
      </div>
    </div>
  );
}
