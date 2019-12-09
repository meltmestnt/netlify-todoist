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
    hex: "#e57373"
  },
  {
    color: "Розовый",
    hex: "#f06292"
  },
  {
    color: "Фиолетовый",
    hex: "#ba68c8"
  },
  {
    color: "Индиго",
    hex: "#7986cb"
  },
  {
    color: "Голубой",
    hex: "#4fc3f7"
  },
  {
    color: "Зеленый",
    hex: "#81c784"
  },
  {
    color: "Лайм",
    hex: "#dce775"
  },
  {
    color: "Желтый",
    hex: "#fff176"
  },
  {
    color: "Оранжевый",
    hex: "#ffb74d"
  },
  {
    color: "Коричневый",
    hex: "#e0e0e0"
  },
  {
    color: "Серый",
    hex: "#212121"
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
          style={{ display: "flex" }}
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
                <span style={{ margin: 0 }}>{color.color}</span>
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
