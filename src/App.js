import FullTimer from "./components/FullTimer";
import React, { useEffect, useState } from "react";
import "./index.css";

export default function App() {
  const [timerList, setTimerList] = useState([]);

  function returnButtonDiv(position) {
    return document.getElementsByClassName(`add-button ${position}`)[0];
  }

  useEffect(() => {
    // console.log("useeffet");
    let central = "before",
      left = "after";
    let addDivButton = returnButtonDiv(central);
    if (addDivButton) {
      if (timerList.length === 0) return;
    } else {
      addDivButton = returnButtonDiv(left);
      if (timerList.length === 0) {
        [central, left] = [left, central];
      } else return;
    }
    addDivButton.classList.replace(central, left);
  }, [timerList]);

  function removeTimer(timer) {
    setTimerList((timerList) => timerList.filter((t) => t.id !== timer.id));
  }

  return (
    <div id="main">
      {timerList.map((timer) => (
        <FullTimer
          key={timer.id}
          id={timer.id}
          expiryTimestamp={timer.expiryTimestamp}
          removeTimer={() => removeTimer(timer)}
        />
      ))}
      <div className="add-button before">
        <button
          onClick={() => {
            // add a new FullTimer component
            const time = new Date();
            time.setSeconds(time.getSeconds() + 0);
            setTimerList((timerList) => [
              ...timerList,
              {
                id: window.prompt("Insert timer name") + ` ${timerList.length}`,
                expiryTimestamp: time,
              },
            ]);
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
