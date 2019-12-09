import React from "react";
import Button from "@material-ui/core/Button";

import ArrowTooltip from "./ArrowTooltip";
import AutocompleteList from "./../components/AutocompleteList";
import FlagIcon from "@material-ui/icons/Flag";

export default function PrioritySuggest(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setPriority } = props;
  let priority = props.priority || [];
  return (
    <React.Fragment>
      <ArrowTooltip
        button={
          <Button
            onClick={e => setAnchorEl(e.currentTarget)}
            className={classes.button}
          >
            <FlagIcon
              color={priority.color || "inherit"}
              className={classes.icon}
            ></FlagIcon>
          </Button>
        }
        title={"Выбрать приоритет"}
      ></ArrowTooltip>
      <AutocompleteList
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        pendingValue={priority}
        setPendingValue={setPriority}
        labels={labels}
        label="Приоритет"
        placeholder="Выберите приоритет"
        singular
        tagIcon={item => <FlagIcon color={item.color}></FlagIcon>}
      ></AutocompleteList>
    </React.Fragment>
  );
}
const labels = [
  {
    name: "Приоритет 1",
    color: "primary"
  },
  {
    name: "Приоритет 2",
    color: "secondary"
  },
  {
    name: "Приоритет 3",
    color: "inherit",
    selected: true
  }
];
