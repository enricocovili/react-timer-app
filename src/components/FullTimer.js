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
// import DurationPicker from "material-duration-picker";

import "../index.css";

export default function FullTimer({ expiryTimestamp, removeTimer, id }) {
  // ID: Name of the timer + index of TimerList
  // var contextType = TimerListContext;
  function playAudio() {
    var audio = new Audio("alarm.wav");
    audio.loop = true;
    audio.play();
    Swal.fire({ title: "Time's off", icon: "warning" }).then(() => {
      audio.loop = false;
      audio.pause();
    });
  }

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    // start,
    pause,
    resume,
    restart,
  } = useTimer({
    autoStart: false,
    expiryTimestamp,
    onExpire: () => {
      playAudio();
    },
  });

  function getInputStorage() {
    let inputStorage = localStorage.getItem(`input ${id}`);
    if (inputStorage === null)
      return () => {
        const time = new Date();
        time.setHours(0, 0, 0, 0);
        return time;
      };
    return new Date(JSON.parse(inputStorage.toString()));
  }

  const [input, setInput] = useState(getInputStorage());

  useEffect(() => {
    localStorage.setItem(`input ${id}`, JSON.stringify(input));
    let time = parseTime(input);
    restart(time);
    pause();
  }, [input]);

  return (
    <section className="wrapper">
      <div className="title-bar">
        <h2>{id.substring(0, id.lastIndexOf(" "))}</h2>
        <IconButton
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
          renderInput={(params) => <TextField {...params} />}
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
            onClick={() => {
              if (!isRunning) {
                if (days + hours + minutes + seconds === 0) {
                  let time = parseTime(input);
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

function parseTime(input) {
  /* Input: string
    return: Date()
  */
  if (!input || input === null) return new Date().setHours(0, 0, 0, 0);
  let time = new Date();
  let timerTime =
    input.getHours() * 60 ** 2 + input.getMinutes() * 60 + input.getSeconds();
  time.setSeconds(time.getSeconds() + timerTime);
  return time;
}
