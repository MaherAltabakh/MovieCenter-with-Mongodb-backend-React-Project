import React from "react";
import "font-awesome/css/font-awesome.css";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.onLiked) classes += "-o";
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onClick}
      className={classes}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
