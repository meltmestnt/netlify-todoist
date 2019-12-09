import React from "react";
import GradeIcon from "@material-ui/icons/Grade";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  secondaryButton: {
    border: "1px solid gray",
    backgroundColor: "transparent",
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    padding: "5px 10px",
    margin: "10px 0px",
    textTransform: "inherit",
    color: `${theme.palette.type === "dark" ? "#fff" : "#000000"} !important`
  }
}));
function ArrowAdviceButton({ text }, ref) {
  const ownClasses = useStyles();
  return (
    <button
      ref={ref}
      variant="outlined"
      className={ownClasses.secondaryButton}
      color="secondary"
    >
      <GradeIcon style={{ margin: "5px 10px" }} color="secondary"></GradeIcon>
      {text}
    </button>
  );
}

export default React.forwardRef(ArrowAdviceButton);
