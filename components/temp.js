import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import ListIcon from "@material-ui/icons/List";
import ArrowTooltip from "./ArrowTooltip";
import TextField from "@material-ui/core/TextField";
import Popover from "@material-ui/core/Popover";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, fade } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  root: {
    width: 221,
    fontSize: 13
  },
  popper: {
    border: "1px solid rgba(27,31,35,.15)",
    boxShadow: "0 3px 12px rgba(27,31,35,.15)",
    borderRadius: 3,
    width: 300,
    zIndex: 1,
    fontSize: 13,
    color: "#586069",
    backgroundColor: "#f6f8fa"
  },
  inputBase: {
    padding: 10,
    width: "100%",
    borderBottom: "1px solid #dfe2e5",
    "& input": {
      borderRadius: 4,
      backgroundColor: theme.palette.common.white,
      padding: 8,
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      border: "1px solid #ced4da",
      fontSize: 14,
      "&:focus": {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main
      }
    }
  },
  paper: {
    boxShadow: "none",
    margin: 0,
    color: "#586069",
    fontSize: 13
  },
  option: {
    minHeight: "auto",
    alignItems: "flex-start",
    padding: 8,
    '&[aria-selected="true"]': {
      backgroundColor: "transparent"
    },
    '&[data-focus="true"]': {
      backgroundColor: theme.palette.action.hover
    }
  },
  popperDisablePortal: {
    position: "relative"
  }
}));
function ProjectsSuggest(props) {
  const classes = {
    ...props.classes,
    ...useStyles()
  };

  const [anchorEl, toggleProjects] = React.useState(null);
  const handleClose = () => toggleProjects(null);
  return (
    <>
      <ArrowTooltip
        button={
          <Button
            onClick={e => toggleProjects(e.currentTarget)}
            className={classes.button}
          >
            <ListIcon className={classes.icon}></ListIcon>
          </Button>
        }
        title={"Выбрать проект"}
      ></ArrowTooltip>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        placement="bottom-start"
        className={classes.popper}
      >
        <div>
          <Autocomplete
            open
            options={[{ title: "Den" }, { title: "Mark" }]}
            getOptionLabel={option => option.title}
            disableportal
            renderTags={() => null}
            noOptionsText="No labels"
            classes={{
              paper: classes.paper,
              option: classes.option,
              popperDisablePortal: classes.popperDisablePortal
            }}
            renderInput={params => (
              <InputBase
                ref={params.ref}
                inputProps={params.inputProps}
                autoFocus
                className={classes.inputBase}
              />
            )}
          />
        </div>
      </Popover>
    </>
  );
}

export default React.forwardRef(ProjectsSuggest);
