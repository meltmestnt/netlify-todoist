import React from "react";
import TakeBackButton from "./../components/TakeBackButton";
import NotFoundImage from "./../components/NotFoundImage";
function NotFound(props) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "white",
        zIndex: 99999
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          marginTop: "40px"
        }}
      >
        <span style={{ width: 400, height: 350 }}>
          <NotFoundImage></NotFoundImage>
        </span>
        <div style={{ margin: "25px 0px" }}>
          <TakeBackButton></TakeBackButton>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
