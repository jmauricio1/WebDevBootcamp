import React, { useState } from "react";
import ToDoItem from "./todo-item";
import InputArea from './input-area';
import "../toDo.css";

function ToDoList() {
  const [itemArray, setItemArray] = useState([]);

  function handleClick(itemName) {
    setItemArray((previousItems) => {
      return [...previousItems, itemName];
    });
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
        <InputArea onClick={handleClick}/>
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
