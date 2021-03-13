import React from "react";
import Detail from './detail';

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <h2 className="name">{props.name}</h2>
        <img className="circle-img" src={props.source}></img>
      </div>
      <div className="bottom">
          <Detail info={props.tel}/>
          <Detail info={props.email} />
      </div>
    </div>
  );
}

export default Card;
