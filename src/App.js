import FullTimer from "./component/FullTimer";
import { useEffect, useState } from "react";
import timerListProvider from "./contexts/timerListContext";
import "./index.css";

function addButtonLayout() {
  const addButtonDiv = document.getElementsByClassName("add-button before")[0];
  if (addButtonDiv) {
    addButtonDiv.classList.replace("before", "after");
  }
}

export default function App() {
  const [timerList, setTimerList] = useState([]);

  // useEffect;
  function removeTimer(id) {
    // SHOULD remove the selected timer
    // const newList = timerList.filter((item) => item.key !== id);
    console.log("timerlist", timerList);
    // setTimerList(newList);
  }

  useEffect(() => {
    console.log("use effect");
  });
  return (
    <div id="main">
      {/* <timerListProvider> */}
      {timerList ? timerList.map((child) => child) : null}
      <div className="add-button before">
        <button
          onClick={() => {
            // add a new FullTimer component
            addButtonLayout();
            const time = new Date();
            time.setSeconds(time.getSeconds() + 0);
            setTimerList((timerList) => [
              ...timerList,
              <FullTimer
                expiryTimestamp={time}
                removeTimer={() => removeTimer()}
                id={window.prompt("Insert timer name") + ` ${timerList.length}`}
                key={timerList.length}
              />,
            ]);
          }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <button
        onClick={() => {
          console.log("timerList", timerList);
          removeTimer(0);
        }}
        className="debug"
      >
        timerList Value DEBUGGER
      </button>
      {/* </timerListProvider> */}
    </div>
  );
}
