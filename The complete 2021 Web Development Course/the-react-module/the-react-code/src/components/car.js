import React from "react";

function Car(props) {
  return (
    <tr>
      <td>{props.brand}</td>
      <td>{props.topSpeed}</td>
      <td>{props.topColor}</td>
    </tr>
  );
}

export default Car;
