import React from "react";

import { Welcome } from "./welcome/welcome";
import { Playing } from "./playing/playing";
import logo from "./images/logo.png";

import "./App.css";
import { Intro } from "./intro/intro";

export default function App() {
  const [state, setState] = React.useState("intro");

  const ready = React.useCallback(() => {
    setState("welcome");
  }, []);

  const start = React.useCallback(() => {
    setState("playing");
  }, []);

  const view = React.useMemo(() => {
    switch (state) {
      case "intro":
        return <Intro onReady={ready} />;
      case "welcome":
        return <Welcome onStart={start} />;
      case "playing":
        return <Playing />;
      case "done":
      default:
        return <div>Something went wrong</div>;
    }
  }, [state, ready, start]);

  return (
    <div className="App">
      {state === "playing" ? (
        <header>
          <img src={logo} alt="BigCo Inc. logo" />
        </header>
      ) : null}
      {state !== "intro" ? (
        <div className="content">
          {view}
          <div className="rotate">Please Rotate your Screen</div>
        </div>
      ) : (
        view
      )}
    </div>
  );
}
