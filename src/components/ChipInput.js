import React from "react";
import ChipInput from "material-ui-chip-input";
import ListIcon from "@material-ui/icons/List";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import { TextField } from "@material-ui/core";
function ChipInp(props) {
  const { classes, chips, setProjects, setMarks, input, setInput } = props;

  const changeHandler = ev => setInput(ev.target.value);
  const addProject = chip => {
    if (chip.indexOf("#") === 0) {
      setProjects([
        ...chips.filter(chip => chip.type === "project"),
        { name: chip.slice(1, chip.length), color: "#000" }
      ]);
      setInput("");
    }
  };
  return chips.length > 0 ? (
    <ChipInput
      value={chips.map(chip => (
        <div
          datatype={chip.type}
          style={{ display: "flex", alignItems: "center" }}
        >
          {chip.type === "project" ? (
            <ListIcon></ListIcon>
          ) : (
            <BookmarksIcon></BookmarksIcon>
          )}
          <h5 style={{ marginLeft: 5 }}>{chip.name}</h5>
        </div>
      ))}
      InputProps={{
        value: input || "",
        onChange: changeHandler,
        autoFocus: true,
        required: true,
        inputProps: {
          style: {
            minWidth: "100px"
          }
        }
      }}
      className={classes.inputMain}
      label="Введите название задачи"
      variant="outlined"
      onAdd={chip => addProject(chip)}
      onDelete={(chip, index) => {
        if (chip.props.datatype === "project") {
          setProjects(
            chips.filter((c, i) => c.type === "project" && i !== index)
          );
        } else if (chip.props.datatype === "mark") {
          setMarks(chips.filter((c, i) => c.type === "mark" && i !== index));
        }
      }}
    ></ChipInput>
  ) : (
    <TextField
      value={input || ""}
      autoFocus
      variant="outlined"
      label="Введите название проекта"
      className={classes.inputMain}
      onChange={changeHandler}
      onKeyPress={e => {
        if (e.charCode === 13) {
          addProject(input);
        }
      }}
    ></TextField>
  );
}

export default ChipInp;
