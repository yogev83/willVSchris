import React from "react";

import { Welcome } from "./welcome/welcome";
import { Playing } from "./playing/playing";
import logo from "./images/logo.png";

import "./App.css";

export default function App() {
  const [state, setState] = React.useState("welcome");

  const start = React.useCallback(() => {
    setState("playing");
  }, []);

  const view = React.useMemo(() => {
    switch (state) {
      case "welcome":
        return <Welcome onStart={start} />;
      case "playing":
        return <Playing />;
      case "done":
      default:
        return <div>Something went wrong</div>;
    }
  }, [state, start]);

  return (
    <div className="App">
      <header>
        <img src={logo} alt="BigCo Inc. logo" />
      </header>
      <div className="content">{view}</div>
    </div>
  );
}
