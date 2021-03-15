import React, { useState } from "react";

function Submission() {
  const [headingText, setHeadingText] = useState("Hello");
  const [isMousedOver, setMouseOver] = useState(false);

  function handleClick() {
    setHeadingText("Submitted");
  }

  function handleMouse(e) {
    setMouseOver(true);
  }

  function handleOut(e) {
    setMouseOver(false);
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        id="submit-button"
        style={{
          backgroundColor: isMousedOver ? "black" : "white",
          color: isMousedOver ? "white" : "#50a3a2",
        }}
        onClick={handleClick}
        onMouseOver={handleMouse}
        onMouseOut={handleOut}
      >
        Submit
      </button>
    </div>
  );
}

export default Submission;
