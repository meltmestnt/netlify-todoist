import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette: { type } }) => ({
  popup: {
    background: type === "light" ? "#212121" : "#37474f",
    color: type === "light" ? "white" : "lightgrey"
  }
}));
function Popup(props) {
  const { handleClose, popup, undo } = props;
  const classes = useStyles();
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={!!popup}
      autoHideDuration={3000}
      onClose={handleClose}
      ContentProps={{
        "aria-describedby": "message-id"
      }}
    >
      <SnackbarContent
        message={<span>{popup}</span>}
        className={classes.popup}
        action={[
          <Button
            key="undo"
            color="primary"
            size="small"
            onClick={() => undo()}
          >
            ОТМЕНИТЬ
          </Button>,
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      ></SnackbarContent>
    </Snackbar>
  );
}

export default Popup;
