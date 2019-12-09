import React from "react";

function ColorBadge({ color }) {
  return (
    <div
      style={{
        borderRadius: "50%",
        width: 20,
        height: 20,
        margin: "0px 3px 0px 3px",
        display: "inline-block",
        backgroundColor: color
      }}
    ></div>
  );
}

export default ColorBadge;
