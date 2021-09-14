import React, { useState, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { TextField } from "@material-ui/core";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import TimePicker from "@material-ui/lab/TimePicker";
import TitleBar from "./TitleBar";
import TimeButtons from "./TimeButtons";
import * as utils from "../utils";
import "../../index.css";

export default function FullTimer(props) {
  let { expiryTimestamp, updateTimeoutSeconds, removeTimer, id, isHidden } =
    props;

  const { seconds, minutes, hours, isRunning, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => {
        let time = utils.parseTime(input);
        restart(time);
        pause();
        utils.playAudio(id);
      },
    });

  const clockValues = [hours, minutes, seconds];

  const [input, setInput] = useState(utils.getInputStorage(id));

  useEffect(() => {
    localStorage.setItem(`input ${id}`, JSON.stringify(input));
    updateTimeoutSeconds(utils.parseTime(input, true));
    let time = utils.parseTime(input);
    restart(time);
    pause();
    // eslint-disable-next-line
  }, [input]);

  if (isHidden) return <></>;

  function TimerBody() {
    return (
      <div className="clock buttons">
        <div className="actual-timer">
          {clockValues.map((item, index) => (
            <>
              <div>{item < 10 ? `0${item}` : item}</div>
              {index === clockValues.length - 1 ? "" : ":"}
            </>
          ))}
        </div>
        <TimeButtons
          pause={() => pause()}
          resume={() => resume()}
          restart={(time) => restart(time)}
          isRunning={() => isRunning}
          clockValues={() => clockValues}
          input={() => input}
        />
      </div>
    );
  }

  return (
    <section className="wrapper">
      <TitleBar id={id} removeTimer={removeTimer} />
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
                  let time = utils.parseTime(input);
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
