import React, { useState } from "react";
import ToDoItem from "./todo-item";
import "../toDo.css";

function ToDoList() {
  const [itemName, setItemName] = useState("");
  const [itemArray, setItemArray] = useState([]);

  function handleChange(e) {
    //console.log(e.target.value);
    setItemName(e.target.value);
  }

  function handleClick() {
    setItemArray((previousItems) => {
      return [...previousItems, itemName];
    });
    setItemName("");
  }

  function deleteItem(id) {
    //console.log("You want to delete");
    setItemArray((previousItems) => {
      return previousItems.filter((item, index) => {
          return index !== id;
      });
    });
  }

  return (
    <div>
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          name="listItem"
          onChange={handleChange}
          value={itemName}
        />
        <button onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {itemArray.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              name={todoItem}
              onChecked={deleteItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ToDoList;
