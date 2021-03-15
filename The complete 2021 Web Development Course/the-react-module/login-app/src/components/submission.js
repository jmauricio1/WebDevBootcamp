import React, { useState } from "react";

function Submission() {
  const [headingText, setHeadingText] = useState("Hello");
  const [isMousedOver, setMouseOver] = useState(false);
  const [name, setName] = useState("...!");
  const [otherText, setOtherText] = useState("");

  //let inputValue = "";

  function handleClick() {
    setHeadingText("Submitted");
  }

  function handleMouse(e) {
    setMouseOver(true);
  }

  function handleOut(e) {
    setMouseOver(false);
  }

  //This will always change the variable 'name' to whatever the user is going to input
  function handleChange(e) {
    //console.log(e.target.value);
    setName(e.target.value);
  }

  //This will change the final value of otherText to whatever the value of 'name' is
  function handleSubmit(e){
      setOtherText("What's up " + name + "!");
  }

  return (
    <div className="container">
      <h1>{headingText}</h1>
      <input
        type="text"
        placeholder="What's your name?"
        onChange={handleChange}
      />
      <button
        id="submit-button"
        style={{
          backgroundColor: isMousedOver ? "black" : "white",
          color: isMousedOver ? "white" : "#50a3a2",
        }}
        //onClick={handleClick}
        onMouseOver={handleMouse}
        onMouseOut={handleOut}
        onClick={handleSubmit}
      >
        Submit
      </button>
      <h1>{otherText}</h1>
    </div>
  );
}

export default Submission;
