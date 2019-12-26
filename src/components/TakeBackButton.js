import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles(theme => ({
  mainButton: {
    textTransform: "inherit",
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    fontSize: "1.2rem",
    padding: "0 30px",
    "&:hover": {
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)"
    }
  }
}));
function TakeBackButton(props) {
  const classes = useStyles();
  const [clicked, toggle] = React.useState(false);
  const history = useHistory();
  const click = ev => {
    toggle(true);
    setTimeout(() => {
      history.replace("/");
    }, 800);
  };
  return (
    <Button
      variant="contained"
      className={classes.mainButton}
      onClick={click}
      disabled={clicked}
    >
      {clicked ? (
        <CircularProgress style={{ color: "#ffd32a" }} />
      ) : (
        `Назад на главную`
      )}
    </Button>
  );
}

export default TakeBackButton;
