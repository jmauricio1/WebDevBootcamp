import React, { useState } from "react";

function ToDoItem(props) {
  // const [clicked, setClicked] = useState(false);

  // function strike(){
  //     setClicked(!clicked);
  // }

  return (
    <li
      onClick={() => {
          props.onChecked(props.id)
      }}
    >
      {props.name}
    </li>
  );
}

export default ToDoItem;
