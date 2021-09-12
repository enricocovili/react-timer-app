import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { TextField } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import ReplayIcon from "@material-ui/icons/Replay";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import { parseTime, getInputStorage, playAudio, getIdName } from "./utils";

import "../../index.css";

export default function FullTimer(props) {
  let { expiryTimestamp, updateTimeoutSeconds, removeTimer, id, isHidden } =
    props;

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => {
        playAudio(id);
      },
    });

  const clockValues = [hours, minutes, seconds];

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

  function TimeButtons() {
    return (
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
    );
  }

  function TitleBar() {
    return (
      <div className="title-bar">
        <h2>{getIdName(id)}</h2>
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
    );
  }

  function TimerBody() {
    return (
      <div className="clock buttons">
        <div className="clock">
          <div className="actual-timer">
            {clockValues.map((item, index) => (
              <>
                <div>{item < 10 ? `0${item}` : item}</div>
                {index === clockValues.length - 1 ? "" : ":"}
              </>
            ))}
          </div>
        </div>
        <TimeButtons />
      </div>
    );
  }

  return (
    <section className="wrapper">
      <TitleBar />
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
      <TimerBody />
      <hr />
    </section>
  );
}