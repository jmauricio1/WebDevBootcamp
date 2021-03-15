import React, { useState } from "react";

function CompStatePrac() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function handleChange(e) {

    const { name, value } = e.target;

    setContact((previousValue) => {
        //...previousValue will fill in whatever is not being changed
        //Could shorten the code even more by taking out return since returning a single thing,
        //but it's more confusing
      return{
          ...previousValue,
          //This is in square brackets to get the variable name 
          //instead of making a new key called 'name' 
          //-> Computed Property Names
          [name]: value
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
