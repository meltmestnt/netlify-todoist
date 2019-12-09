import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
function DialogSwitch(props) {
  const { handleChange, checked } = props;
  return (
    <FormControlLabel
      style={{ margin: 0 }}
      control={
        <Switch checked={checked} onChange={handleChange} color="primary" />
      }
      label="Добавить в избранное"
    />
  );
}

export default DialogSwitch;
