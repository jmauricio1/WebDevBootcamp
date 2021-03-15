import React, {useState} from "react";

function InputArea(props) {
  const [itemName, setItemName] = useState("");

  function handleChange(e) {
    //console.log(e.target.value);
    setItemName(e.target.value);
  }

  return (
    <form className="form">
      <input
        type="text"
        name="listItem"
        onChange={handleChange}
        value={itemName}
      />
      <button
        onClick={(e) => {

          props.onClick(itemName);
          e.preventDefault();
          setItemName("");
        }}
      >
        <span>Add</span>
      </button>
    </form>
  );
}

export default InputArea;
