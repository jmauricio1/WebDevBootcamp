import React, { useState } from "react";
import Car from "./car";

import cars from "../cars";

function CarsPage() {
  let [tesla, honda] = cars;

  const {
    speedStats: { topSpeed: hondaTopSpeed },
  } = honda;
  const {
    speedStats: { topSpeed: teslaTopSpeed },
  } = tesla;

  const {
    coloursByPopularity: [hondaTopColour],
  } = honda;
  const {
    coloursByPopularity: [teslaTopColour],
  } = tesla;

  return (
    <table>
      <tr>
        <th>Brand</th>
        <th>Top Speed</th>
        <th> Top Color</th>
      </tr>
      <Car brand={tesla.model} topSpeed={teslaTopSpeed} topColor={teslaTopColour}/>
      <Car brand={honda.model} topSpeed={hondaTopSpeed} topColor={hondaTopColour}/>
    </table>
  );
}

export default CarsPage;
