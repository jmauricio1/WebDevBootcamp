import React from "react";

function Card(props) {
  return (
    <div className="term">
      <dt>
        <span className="emoji">{props.emojiImg}</span>
        <span>{props.emojiName}</span>
      </dt>
      <dd>{props.desc}</dd>
    </div>
  );
}

export default Card;
