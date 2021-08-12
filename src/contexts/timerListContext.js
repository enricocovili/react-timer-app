import React, { createContext, useState } from "react";

export const TimerListContext = createContext();

export default function TimerListProvider() {
  const [timerList, setTimerList] = useState([]);
  return (
    <TimerListContext.Provider
      value={{ timerList }}
    ></TimerListContext.Provider>
  );
}
