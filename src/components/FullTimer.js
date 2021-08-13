import React, { useState } from "react";
import { useTimer } from "react-timer-hook";
import Swal from "sweetalert2";
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
      changePlayIcon(null);
    },
  });

  const [input, setInput] = useState("");

  function changePlayIcon(Restart) {
    let buttonClass = `fa-${!isRunning ? "play" : "pause"}`;
    let futureClass = `fa-${isRunning ? "play" : "pause"}`;
    if (Restart) {
      futureClass = "fa-play";
    }
    const newClass = document.getElementById(id);
    newClass.classList.replace(buttonClass, futureClass);
  }

  return (
    <section className="wrapper">
      {/* <TimerListContext.Provider> */}
      <div className="title-bar">
        <h2>{id.substring(0, id.lastIndexOf(" "))}</h2>
        <button
          onClick={() => {
            // var idNumber = id.substring(id.lastIndexOf(" "), id.length);
            removeTimer();
          }}
        >
          <i className="fas fa-times button-action"></i>
        </button>
      </div>
      <input
        placeholder="INSERT TIMER TIME"
        value={input}
        onInput={(e) => setInput(e.target.value)}
      ></input>
      <div className="clock buttons">
        <div className="clock">
          <div className="actual-timer">
            <div className="hours">{hours}</div>:
            <div className="minutes">{minutes}</div>:
            <div className="days">{days}</div>:
            <div className="seconds">{seconds}</div>
          </div>
        </div>
        <div className="buttons">
          <button
            onClick={() => {
              if (!isRunning) {
                if (days + hours + minutes + seconds === 0) {
                  // console.log("init start");
                  let time = parseTime(input);
                  restart(time);
                  changePlayIcon(null);
                } else {
                  resume();
                }
              } else {
                pause();
              }
              changePlayIcon(null);
            }}
          >
            <i id={id} className="fas fa-play button-action"></i>
          </button>
          <button
            onClick={() => {
              let time = parseTime(input);
              restart(time);
              changePlayIcon("start");
              pause();
            }}
          >
            <i
              className="fas fa-redo button-action"
              aria-hidden="true"
              src="https://img.icons8.com/fluency/48/000000/recurring-appointment.png"
            ></i>
          </button>
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
  let lastLetter = input.slice(input.length - 1, input.length).toLowerCase();
  if (lastLetter === "m") {
    // minutes
    timerTime = parseInt(input) * 60;
  } else if (lastLetter === "h") {
    // hours
    timerTime = parseInt(input) * 60 ** 2;
  } else if (lastLetter === "d") {
    // days
    timerTime = parseInt(input) * 60 ** 2 * 24;
  } else {
    // seconds
    timerTime = parseInt(input);
  }
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerTime);
  return time;
}
