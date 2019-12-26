import React from "react";
import Button from "@material-ui/core/Button";

import ArrowTooltip from "./ArrowTooltip";
import AutocompleteDialog from "./AutocompleteDialog";
import FlagIcon from "@material-ui/icons/Flag";
import generateId from "./../utils/generator";
export default function PrioritySuggest(props) {
  const { classes } = props;
  const [dialog, toggleDialog] = React.useState(false);
  const { setPriority, apply = null } = props;
  let priority = props.priority || [];
  return (
    <React.Fragment>
      <ArrowTooltip
        button={
          <Button onClick={e => toggleDialog(true)} className={classes.button}>
            <FlagIcon
              color={priority.color || "inherit"}
              className={classes.icon}
            ></FlagIcon>
          </Button>
        }
        title={"Выбрать приоритет"}
      ></ArrowTooltip>
      <AutocompleteDialog
        pendingValue={priority}
        dialog={dialog}
        toggleDialog={toggleDialog}
        setPendingValue={setPriority}
        labels={labels}
        label="Приоритет"
        apply={apply}
        placeholder="Выберите приоритет"
        singular
        tagIcon={item => <FlagIcon color={item.color}></FlagIcon>}
      ></AutocompleteDialog>
    </React.Fragment>
  );
}
const labels = [
  {
    name: "Приоритет 1",
    color: "primary",
    id: generateId(10)
  },
  {
    name: "Приоритет 2",
    color: "secondary",
    id: generateId(10)
  },
  {
    name: "Приоритет 3",
    color: "inherit",
    selected: true,
    id: generateId(10)
  }
];
