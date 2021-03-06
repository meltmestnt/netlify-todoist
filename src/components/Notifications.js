import React from "react";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";

function Notifications(props) {
  const { handleClose, el, classes } = props;
  const open = Boolean(el);
  return (
    <Popover
      anchorEl={el}
      onClose={handleClose}
      open={open}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <Typography className={classes.popover}>
        The content of the Popover.
      </Typography>
    </Popover>
  );
}

export default Notifications;
