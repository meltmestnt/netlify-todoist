import React from "react";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import ArrowTooltip from "./ArrowTooltip";
import AutocompleteDialog from "./AutocompleteDialog";
import { useSelector } from "react-redux";
import ColorBadge from "./ColorBadge";
export default function ProjectsSuggest(props) {
  const { classes } = props;
  const [dialog, toggleDialog] = React.useState(false);
  const { projects, setProjects } = props;
  const labels = useSelector(state => state.tags.projects);
  return (
    <React.Fragment>
      <ArrowTooltip
        button={
          <Button onClick={e => toggleDialog(true)} className={classes.button}>
            <ListIcon className={classes.icon}></ListIcon>
          </Button>
        }
        title={"Выбрать проект"}
      ></ArrowTooltip>
      <AutocompleteDialog
        dialog={dialog}
        toggleDialog={toggleDialog}
        pendingValue={projects}
        setPendingValue={setProjects}
        label="Проекты"
        noLabels="Нет созданных проектов!"
        placeholder="Введите название проекта"
        labels={labels}
      ></AutocompleteDialog>
    </React.Fragment>
  );
}

// From https://github.com/abdonrd/github-labels
