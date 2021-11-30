import React, { useState, useEffect, useContext } from "react";
import Weather from "./components/weather";
import FetchApi from "./api/fetchApi";
import { SettingsContext } from "./context/SettingsContext";
import Button from "./components/Button";
import SetPomodoro from "./components/SetPomodoro";
import CountdownAnimation from "./components/CountdownAnimation";

function App() {
  const { weather } = FetchApi();

  const {
    pomodoro,
    executing,
    startAnimate,
    children,
    startTimer,
    pauseTimer,
    updateExecute,
    setCurrentTimer,
    SettingsBtn,
  } = useContext(SettingsContext);

  useEffect(() => {
    updateExecute(executing);
  }, [executing, startAnimate]);

  return (
    <div className="app">
      <main>
        <div className="weather">
          {weather.main && <Weather weather={weather} />}
        </div>
        <div className="container-flex">
          <h1>Pomodoro</h1>
        <small>Be productive the right way.</small>
        {pomodoro !== 0 ? (
          <>
            <div className="container-flex-row">
              {/* <ul className="labels"> */}
              <li>
                <Button
                  title="Work"
                  activeClass={
                    executing.active === "work" ? "active-label" : undefined
                  }
                  _callback={() => setCurrentTimer("work")}
                />
              </li>
              <li>
                <Button
                  title="Short Break"
                  activeClass={
                    executing.active === "short" ? "active-label" : undefined
                  }
                  _callback={() => setCurrentTimer("short")}
                />
              </li>
              <li>
                <Button
                  title="Long Break"
                  activeClass={
                    executing.active === "long" ? "active-label" : undefined
                  }
                  _callback={() => setCurrentTimer("long")}
                />
              </li>
            {/* </ul> */}
            </div>
           
            <div className="timer-container">
              <div className="time-wrapper">
                <CountdownAnimation
                  key={pomodoro}
                  timer={pomodoro}
                  animate={startAnimate}
                >
                  {children}
                </CountdownAnimation>
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                title="Start"
                activeClass={!startAnimate ? "active" : undefined}
                _callback={startTimer}
              />
              <Button
                title="Pause"
                activeClass={startAnimate ? "active" : undefined}
                _callback={pauseTimer}
              />
               <Button title="Settings" _callback={SettingsBtn} />
            </div>
          </>
        ) : (
          <SetPomodoro />
        )}
        </div>
      </main>
    </div>
  );
}

export default App;
