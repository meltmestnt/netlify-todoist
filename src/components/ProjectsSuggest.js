import React from "react";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import ArrowTooltip from "./ArrowTooltip";
import AutocompleteList from "./../components/AutocompleteList";
import { useSelector } from "react-redux";
import ColorBadge from "./ColorBadge";
export default function ProjectsSuggest(props) {
  const { classes } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { projects, setProjects } = props;
  const labels = useSelector(state => state.tags.projects);
  return (
    <React.Fragment>
      <ArrowTooltip
        button={
          <Button
            onClick={e => setAnchorEl(e.currentTarget)}
            className={classes.button}
          >
            <ListIcon className={classes.icon}></ListIcon>
          </Button>
        }
        title={"Выбрать проект"}
      ></ArrowTooltip>
      <AutocompleteList
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        pendingValue={projects}
        setPendingValue={setProjects}
        label="Проекты"
        noLabels="Нет созданных проектов!"
        tagIcon={item => <ColorBadge color={item.color}></ColorBadge>}
        placeholder="Введите название проекта"
        labels={labels}
      ></AutocompleteList>
    </React.Fragment>
  );
}

// From https://github.com/abdonrd/github-labels
