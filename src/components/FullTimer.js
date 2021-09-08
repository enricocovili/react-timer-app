import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import Swal from "sweetalert2";
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import audioURL from "./../media/Leapfrog.ogg";

import "../index.css";

export default function FullTimer({
  expiryTimestamp,
  updateTimeoutSeconds,
  removeTimer,
  id,
  isHidden,
}) {
  const IdName = id.substring(0, id.lastIndexOf(" "));

  function playAudio() {
    Swal.close();
    let audio = new Audio(audioURL);
    audio.loop = true;
    audio.play();
    Swal.fire({ title: `${IdName}'s off`, icon: "warning" }).then(() => {
      audio.loop = false;
      audio.pause();
    });
  }

  /**
   * @param {Date} input - current value of TimePicker Component
   * @param {boolean} onlySeconds - if true, parseTime return time in seconds
   * @returns {Date|number}
   */
  function parseTime(input, onlySeconds) {
    if (!input || input === null) return getMidNight();
    let time = new Date();
    let durationSeconds =
      input.getHours() * 60 ** 2 + input.getMinutes() * 60 + input.getSeconds();
    if (onlySeconds) return durationSeconds;
    // if the timer is set to 00:00:00
    if (!durationSeconds) return null;
    time.setSeconds(time.getSeconds() + durationSeconds);
    expiryTimestamp = time;
    return time;
  }

  function getMidNight() {
    // workaround to get 00:00:00 at timer's creation
    const time = new Date();
    time.setHours(0, 0, 0, 0);
    return time;
  }

  function getInputStorage() {
    let inputStorage = localStorage.getItem(`input ${id}`);
    if (inputStorage === "null" || !inputStorage) {
      return getMidNight();
    }
    return new Date(JSON.parse(inputStorage.toString()));
  }

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => {
        playAudio();
      },
    });

  const [input, setInput] = useState(getInputStorage());

  useEffect(() => {
    localStorage.setItem(`input ${id}`, JSON.stringify(input));
    updateTimeoutSeconds(parseTime(input, true));
    let time = parseTime(input);
    restart(time);
    pause();
    // eslint-disable-next-line
  }, [input]);

  if (isHidden) return <></>;

  return (
    <section className="wrapper">
      <div className="title-bar">
        <h2>{IdName}</h2>
        <IconButton
          // style={{ color: "white" }}
          aria-label="delete"
          color="default"
          onClick={() => {
            localStorage.removeItem(`input ${id}`);
            removeTimer();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          ampm={false}
          ampmInClock={false}
          views={["hours", "minutes", "seconds"]}
          inputFormat="HH:mm:ss"
          mask="__:__:__"
          label="INSERT TIME HERE"
          value={input}
          onChange={(newValue) => {
            setInput(newValue);
          }}
          renderInput={(params) => (
            <TextField
              // style={{ color: "white" }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  let time = parseTime(input);
                  restart(time);
                }
              }}
              {...params}
            />
          )}
        />
      </LocalizationProvider>
      <div className="clock buttons">
        <div className="clock">
          <div className="actual-timer">
            <div className="hours">{hours}</div>:
            <div className="minutes">{minutes}</div>:
            <div className="seconds">{seconds}</div>
          </div>
        </div>
        <div className="buttons">
          <IconButton
            // style={{ color: "white" }}
            onClick={() => {
              if (!isRunning) {
                if (!(hours || minutes || seconds)) {
                  let time = parseTime(input);
                  if (!time) return;
                  restart(time);
                } else {
                  resume();
                }
              } else {
                pause();
              }
            }}
          >
            {!isRunning ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
          <IconButton
            // style={{ color: "white" }}
            onClick={() => {
              let time = parseTime(input);
              restart(time);
              pause();
            }}
          >
            <ReplayIcon />
          </IconButton>
        </div>
      </div>
      <hr />
    </section>
  );
}
