import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import DraggableContainer from "./../containers/Draggable";
import { useTheme } from "@material-ui/core/styles";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import { makeStyles } from "@material-ui/core/styles";
import ArrowTooltip from "./ArrowTooltip";
import { Link } from "react-router-dom";
import { useTagTasks } from "../utils/taskFilter";
import Badge from "@material-ui/core/Badge";
const useStyles = makeStyles({
  dragIcon: {
    position: "absolute",
    top: "50%",
    left: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "translate(0%, -50%)",
    opacity: 0.6,
    cursor: "pointer"
  },
  typo: {
    marginLeft: 13,
    fontWeight: "lighter",
    fontFamily: "Segoe UI, sans-serif !important",
    fontSize: "1rem"
  }
});
function Tag({
  classes: propClasses,
  item,
  tagIcon,
  index: i,
  disableDraggable,
  to,
  taskSelector,
  ...rest
}) {
  const theme = useTheme();
  const classes = {
    ...propClasses,
    ...useStyles()
  };
  const tasksLength = useTagTasks(item, taskSelector).length;

  return (
    <>
      {disableDraggable ? (
        <ListItem
          style={{
            background: theme.palette.type === "light" ? "white" : "#282C34",
            boxShadow: to
              ? "none"
              : "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
          }}
          {...rest}
          button
          component={to ? Link : null}
          to={to && to}
        >
          <Badge badgeContent={tasksLength}>{tagIcon(item)}</Badge>
          <ListItemText>
            <Typography variant="body1" className={classes.typo}>
              {item.name}
            </Typography>
          </ListItemText>
        </ListItem>
      ) : (
        <DraggableContainer id={item.id} index={i}>
          {(provided, snapshot, ...rest) => (
            <ListItem
              component={Link}
              to={to}
              button
              {...rest}
              style={{
                paddingLeft: 35,
                background:
                  theme.palette.type === "light" ? "white" : "#282C34",
                boxShadow:
                  snapshot.isDragging &&
                  "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)"
              }}
            >
              <ArrowTooltip
                title="Переместить тэг"
                button={
                  <div
                    className={classes.dragIcon}
                    {...provided.dragHandleProps}
                  >
                    <DragIndicatorIcon />
                  </div>
                }
              ></ArrowTooltip>
              <Badge badgeContent={tasksLength}>{tagIcon(item)}</Badge>
              <ListItemText>
                <Typography variant="body1" className={classes.typo}>
                  {item.name}
                </Typography>
              </ListItemText>
            </ListItem>
          )}
        </DraggableContainer>
      )}
    </>
  );
}

export default Tag;
