import React, { useState } from "react";

function CompStatePrac() {
    //Setting the state of an object insetad of making all independent variables
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  //Whenever an input element is changed, do this
  function handleChange(e) {

    //Destructuring so we can access the target input easier
    const { name, value } = e.target;

    //Changing the values/state of the contact
    //We have a parameter of 'previousValue' so we can use the old data to also be
    //inserted into the new state
    setContact((previousValue) => {
      if (name === "fName") {
        return {
          fName: value,
          lName: previousValue.lName,
          email: previousValue.email,
        };
      } else if (name === "lName") {
        return {
          fName: previousValue.fName,
          lName: value,
          email: previousValue.email,
        };
      } else if (name === "email") {
        return {
          fName: previousValue.fName,
          lName: previousValue.lName,
          email: value,
        };
      }
    });
  }

  return (
    <div>
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
          {/* We use handleChange for each input because we're updating the values of one object,
          which is contact*/}
        <input
          name="fName"
          onChange={handleChange}
          placeholder="First Name"
          value={contact.fName}
        />
        <input
          name="lName"
          onChange={handleChange}
          placeholder="Last Name"
          value={contact.lName}
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={contact.email}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default CompStatePrac;
