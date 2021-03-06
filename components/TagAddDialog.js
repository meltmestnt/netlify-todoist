import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogColorPicker from "./DialogColorPicker";
import DialogSwitch from "./DialogSwitch";
import { makeStyles } from "@material-ui/core/styles";
import generateId from "./../utils/generator";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: 5,
    marginLeft: 0
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100% !important",
      width: "100%",
      padding: "30px 10px",
      minHeight: "100%",
      margin: "0px !important"
    }
  },
  text: {
    margin: 5,
    marginLeft: 0
  }
}));
function TagAddDialog(props) {
  const defaultColor = "#e66767";
  const { open, close, title, body, addProject } = props;
  const [color, toggleColor] = React.useState(defaultColor);
  const [favorite, toggleFavorite] = React.useState(false);
  const [name, toggleChange] = React.useState("");
  const classes = useStyles();
  const handleColor = ev => {
    toggleColor(ev.target.value || null);
  };
  const handleFavorite = ev => {
    toggleFavorite(!favorite);
  };
  const handleSubmit = () => {
    if (color && name.length >= 3) {
      addProject({
        name,
        color,
        favorite,
        id: generateId(10)
      });
    }
    close();
    clearInfo();
  };
  const clearInfo = () => {
    toggleColor(defaultColor);
    toggleChange("");
    toggleFavorite(false);
  };
  return (
    <Dialog
      classes={{ paper: classes.paper }}
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={close}
    >
      <DialogTitle style={{ padding: 10 }} id="form-dialog-title">
        Создать {title}
      </DialogTitle>
      <DialogContent style={{ padding: 10 }}>
        <DialogContentText className={classes.text}>
          Название {body}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          style={{ margin: 5, marginLeft: 0 }}
          variant="outlined"
          fullWidth
          value={name}
          onChange={e => toggleChange(e.target.value)}
          label={`Введите название ${body}`}
        />
        <DialogColorPicker
          color={color}
          body={body}
          open={open}
          classes={classes}
          handleChange={handleColor}
        ></DialogColorPicker>
        <DialogSwitch
          checked={favorite}
          handleChange={handleFavorite}
        ></DialogSwitch>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Отменить
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TagAddDialog;
