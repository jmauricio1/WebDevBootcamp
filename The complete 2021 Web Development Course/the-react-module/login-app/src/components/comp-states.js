import React, { useState } from "react";

function CompStates() {
  const [fullName, setFullName] = useState({
    fName: "",
    lName: "",
  });

  function handleChange(e) {
    /* Instead of this,
    const newValue = e.target.value;
    const inputName = e.target.name;
    */

    //Use desctructuring to make code simpler
    const {value, name} = e.target;

    console.log(name + ": " + value);

    setFullName((previousValue) => {
      // console.log(previousValue);
      if (name === "fName") {
        return {
          fName: value,
          lName: previousValue.lName,
        };
      } else if (name === "lName") {
        return {
          fName: previousValue.fName,
          lName: value,
        };
      }
    });
  }

  return (
    <div>
      <h1>
        Hello {fullName.fName} {fullName.lName}
      </h1>
      <input
        name="fName"
        onChange={handleChange}
        placeholder="First Name"
        value={fullName.fName}
      />
      <input
        name="lName"
        onChange={handleChange}
        placeholder="Last Name"
        value={fullName.lName}
      />
      <button>Submit</button>
    </div>
  );
}

export default CompStates;
