import React, { useState } from "react";

function StateHook() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount(count + 1);
  }

  function decrease(){
      setCount(count - 1);
  }

  const [currentTime, setTime] = useState("TIME");

  setInterval(getTime, 1000)

  function getTime(){
      let temp = new Date();
      setTime(temp.toLocaleTimeString());
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increase}>+</button>
      <button onClick={decrease}>-</button>
      <br />
      <hr />
      <h1>{currentTime}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default StateHook;
