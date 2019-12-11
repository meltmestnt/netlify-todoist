import React from "react";
import DialogContentText from "@material-ui/core/DialogContentText";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ColorBadge from "./ColorBadge";
const colors = [
  {
    color: "Красный",
    hex: "#e66767"
  },
  {
    color: "Розовый",
    hex: "#f78fb3"
  },
  {
    color: "Фиолетовый",
    hex: "#D980FA"
  },
  {
    color: "Индиго",
    hex: "#546de5"
  },
  {
    color: "Голубой",
    hex: "#3dc1d3"
  },
  {
    color: "Зеленый",
    hex: "#05c46b"
  },
  {
    color: "Лайм",
    hex: "#A3CB38"
  },
  {
    color: "Желтый",
    hex: "#feca57"
  },
  {
    color: "Оранжевый",
    hex: "#ff9f43"
  },
  {
    color: "Персиковый",
    hex: "#f3a683"
  },
  {
    color: "Коричневый",
    hex: "#795548"
  },
  {
    color: "Серый",
    hex: "#596275"
  },
  {
    color: "Черный",
    hex: "#121212"
  }
];
function DialogColorPicker(props) {
  const { body, handleChange, color, open, classes } = props;
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setTimeout(
      () =>
        setLabelWidth(inputLabel.current ? inputLabel.current.offsetWidth : 0),
      1
    );
  }, [open]);
  return (
    <>
      <DialogContentText className={classes.text}>
        Цвет {body}
      </DialogContentText>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Цвет
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={color}
          onChange={handleChange}
          labelWidth={labelWidth}
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center"
          }}
        >
          {colors.map(color => {
            return (
              <MenuItem
                style={{
                  display: "flex",
                  height: "40px",
                  minHeight: "0",
                  padding: 5,
                  fontSize: "0.85rem"
                }}
                value={color.hex}
              >
                <ColorBadge color={color.hex}></ColorBadge>
                <span style={{ margin: 0, marginLeft: "5px" }}>
                  {color.color}
                </span>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
}

export { colors };

export default DialogColorPicker;
