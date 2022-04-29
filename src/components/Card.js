import React from "react";

const Card = function (props) {
  console.log(props);
  return (
    <div className="singleCard" onClick={props.onClick}>
      <img id={props.id} src={require(`../images/${props.value}`)} />
    </div>
  );
};

export default Card;
