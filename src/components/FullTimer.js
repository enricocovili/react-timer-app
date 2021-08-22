import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';
import Swal from 'sweetalert2';
import { TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ReplayIcon from '@material-ui/icons/Replay';

// import { TimerListContext } from "../contexts/timerListContext";
import "../index.css";

export default function FullTimer({ expiryTimestamp, removeTimer, id }) {
  // ID: Name of the timer + index of TimerList
  // var contextType = TimerListContext;
  function playAudio() {
    var audio = new Audio("alarm.wav");
    audio.loop = true;
    audio.play();
    Swal.fire({ title: "TIMER", icon: "error" }).then(() => {
      audio.loop = false;
      audio.pause();
      return null;
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

  const [input, setInput] = useState("");

  return (
    <section className="wrapper">
      {/* <TimerListContext.Provider> */}
      <div className="title-bar">
        <h2>{id.substring(0, id.lastIndexOf(" "))}</h2>
        <IconButton
          aria-label="delete"
          color="default"
          onClick={() => {
            removeTimer();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      <TextField
        placeholder="INSERT TIMER TIME"
        value={input}
        onInput={(e) => setInput(e.target.value)}
      ></TextField>
      <div className="clock buttons">
        <div className="clock">
          <div className="actual-timer">
            <div className="days">{days}</div>:
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
                  // console.log("init start");
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
      {/* </TimerListContext.Provider> */}
    </section>
  );
}

function parseTime(input) {
  /* Input: string
    return: Date()
  */
  let timerTime;
  switch (input.slice(input.length - 1, input.length).toLowerCase()) {
    default:
      timerTime = parseInt(input);
      break;
    case "m":
      timerTime = parseInt(input) * 60;
      break;
    case "h":
      timerTime = parseInt(input) * 60 ** 2;
      break;
    case "d":
      timerTime = parseInt(input) * 60 ** 2 * 24;
      break;
  }
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerTime);
  return time;
}
